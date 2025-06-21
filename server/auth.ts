import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const PostgresSessionStore = connectPg(session);
  
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "your-secret-key-here",
    resave: false,
    saveUninitialized: true, // Changed to true for debugging
    store: new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: false  // Disable auto-creation to avoid conflicts
    }),
    cookie: {
      secure: false, // Set to false for development (localhost)
      httpOnly: false, // Changed to false for debugging
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "lax"
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Debug middleware
  app.use((req, res, next) => {
    if (req.path.includes('/api/')) {
      console.log(`${req.method} ${req.path} - Session ID: ${req.sessionID?.substring(0, 8)}..., Authenticated: ${req.isAuthenticated()}`);
    }
    next();
  });

  // Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user || !(await comparePasswords(password, user.password))) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Google OAuth Strategy
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  console.log("Google OAuth Config - Client ID:", googleClientId?.substring(0, 10) + "...");
  console.log("Google OAuth Config - Client Secret exists:", !!googleClientSecret);
  
  if (!googleClientId || !googleClientSecret) {
    console.error("Missing Google OAuth credentials");
    throw new Error("Google OAuth credentials not configured");
  }
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: process.env.NODE_ENV === 'development' 
          ? "http://localhost:5000/api/auth/google/callback"
          : `https://${process.env.REPLIT_DEV_DOMAIN}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google OAuth callback received:", profile.id, profile.emails?.[0]?.value);
          
          let user = await storage.getUserByEmail(profile.emails?.[0]?.value || "");
          
          if (!user) {
            console.log("Creating new user from Google OAuth");
            // Create new user
            user = await storage.createUser({
              email: profile.emails?.[0]?.value || "",
              username: profile.displayName || profile.emails?.[0]?.value || "",
              fullName: profile.displayName || "",
              password: "", // No password for OAuth users
              subscriptionPlan: "free",
              careerScore: 0
            });
          } else {
            console.log("Existing user found, logging in");
          }
          
          return done(null, user);
        } catch (error) {
          console.error("Google OAuth error:", error);
          return done(error);
        }
      }
    )
  );



  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      console.log("Deserializing user:", id);
      const user = await storage.getUser(id);
      if (!user) {
        console.log("User not found during deserialization:", id);
        return done(null, false);
      }
      console.log("User deserialized successfully:", user.email);
      done(null, user);
    } catch (error) {
      console.error("Deserialization error:", error);
      done(error);
    }
  });

  // Auth Routes
  app.post("/api/register", async (req, res, next) => {
    try {
      const { email, username, fullName, password } = req.body;
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.createUser({
        email,
        username,
        fullName,
        password: await hashPassword(password),
        subscriptionPlan: "free",
        careerScore: 0
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    console.log("User endpoint called. Authenticated:", req.isAuthenticated(), "Session:", !!req.session, "User:", !!req.user);
    if (!req.isAuthenticated()) {
      console.log("User not authenticated, returning 401");
      return res.sendStatus(401);
    }
    console.log("Returning authenticated user:", req.user?.email);
    res.json(req.user);
  });

  // Google OAuth routes
  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  app.get("/api/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/?error=google_failed" }),
    (req, res) => {
      console.log("Google OAuth success. User:", req.user?.email, "Session ID:", req.sessionID);
      console.log("Is authenticated:", req.isAuthenticated());
      res.redirect("/dashboard");
    }
  );
}