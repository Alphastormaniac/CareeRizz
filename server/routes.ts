import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertResumeSchema, insertMentorSessionSchema, insertProjectSchema, insertPaymentSchema, insertUserSchema } from "@shared/schema";

const upload = multer({ dest: 'uploads/' });

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, phone, password, firstName, lastName, authProvider = 'email' } = req.body;

      // Check if user already exists
      const existingUser = email ? await storage.getUserByEmail(email) : null;
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Create new user
      const userData = {
        username: email ? email.split('@')[0] : phone,
        password, // In production, hash this password
        email: email || null,
        phoneNumber: phone || null,
        firstName,
        lastName,
        authProvider,
        careerScore: 0,
        coursesCompleted: 0,
        badges: 0,
        mentorSessions: 0,
        subscriptionPlan: "free",
        resumeAnalysisCount: 0,
        freeAnalysisUsed: false
      };

      const validatedData = insertUserSchema.parse(userData);
      const user = await storage.createUser(validatedData);

      // In a real app, you'd set up a session here
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName 
        } 
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, phone, password, authProvider = 'email' } = req.body;

      // Find user by email or phone
      let user = null;
      if (email) {
        user = await storage.getUserByEmail(email);
      } else if (phone) {
        // In a real app, you'd have a getUserByPhone method
        user = await storage.getUserByEmail(phone); // Temporary fallback
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In production, verify hashed password
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Update last login
      await storage.updateUser(user.id, { lastLogin: new Date() });

      // In a real app, you'd set up a session here
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName 
        } 
      });
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({ message: "Failed to sign in" });
    }
  });

  app.post("/api/auth/signout", async (req, res) => {
    try {
      // In a real app, you'd destroy the session here
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to sign out" });
    }
  });

  // Get current user data
  app.get("/api/user", async (req, res) => {
    try {
      // For demo purposes, always return user ID 1
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  // Get user's resume
  app.get("/api/resume", async (req, res) => {
    try {
      const resume = await storage.getResumeByUserId(1);
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  // Upload resume
  app.post("/api/resume/upload", upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Mock skill extraction and ATS scoring
      const extractedSkills = ["React.js", "JavaScript", "Node.js", "Git"];
      const atsScore = Math.floor(Math.random() * 20) + 80; // 80-100
      const keywordScore = Math.floor(Math.random() * 20) + 70; // 70-90

      const resumeData = {
        userId: 1,
        fileName: req.file.originalname,
        filePath: req.file.path,
        extractedSkills,
        atsScore,
        keywordScore
      };

      const validatedData = insertResumeSchema.parse(resumeData);
      const resume = await storage.createResume(validatedData);
      
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload resume" });
    }
  });

  // Get courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get recommended courses
  app.get("/api/courses/recommended", async (req, res) => {
    try {
      const missingSkills = ["AWS", "Docker", "TypeScript", "System Design"];
      const recommendedCourses = await storage.getRecommendedCourses(missingSkills);
      res.json(recommendedCourses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommended courses" });
    }
  });

  // Get user's courses
  app.get("/api/user/courses", async (req, res) => {
    try {
      const userCourses = await storage.getUserCourses(1);
      res.json(userCourses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user courses" });
    }
  });

  // Get mentors
  app.get("/api/mentors", async (req, res) => {
    try {
      const mentors = await storage.getTopMentors();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mentors" });
    }
  });

  // Book mentor session
  app.post("/api/mentors/:mentorId/book", async (req, res) => {
    try {
      const { mentorId } = req.params;
      const { sessionDate, duration } = req.body;

      const mentor = await storage.getMentor(parseInt(mentorId));
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      const sessionData = {
        userId: 1,
        mentorId: parseInt(mentorId),
        sessionDate: new Date(sessionDate),
        duration,
        price: parseFloat(mentor.hourlyRate) * (duration / 60),
        status: "scheduled"
      };

      const validatedData = insertMentorSessionSchema.parse(sessionData);
      const session = await storage.createMentorSession(validatedData);
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to book mentor session" });
    }
  });

  // Get user's projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getUserProjects(1);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Create project
  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = {
        ...req.body,
        userId: 1
      };

      const validatedData = insertProjectSchema.parse(projectData);
      const project = await storage.createProject(validatedData);
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Get user's skill badges
  app.get("/api/badges", async (req, res) => {
    try {
      const badges = await storage.getUserBadges(1);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch badges" });
    }
  });

  // Get interview performance
  app.get("/api/interview/performance", async (req, res) => {
    try {
      const performance = await storage.getUserInterviewPerformance(1);
      // Return mock performance if no data exists
      if (performance.length === 0) {
        res.json({
          technicalScore: 80,
          communicationScore: 75,
          problemSolvingScore: 85
        });
      } else {
        const latest = performance[performance.length - 1];
        res.json(latest);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch interview performance" });
    }
  });

  // Create Razorpay order
  app.post("/api/payment/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR", notes = {} } = req.body;
      
      // Mock Razorpay order creation
      const order = {
        id: `order_${Math.random().toString(36).substr(2, 9)}`,
        amount: amount * 100, // Convert to paise
        currency,
        status: "created",
        notes
      };

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  // Verify payment
  app.post("/api/payment/verify", async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
      
      // In a real implementation, verify the signature here
      // For demo purposes, we'll assume all payments are successful
      
      const paymentData = {
        userId: 1,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        amount: "1999.00",
        currency: "INR",
        status: "completed",
        paymentType: "subscription"
      };

      const validatedData = insertPaymentSchema.parse(paymentData);
      const payment = await storage.createPayment(validatedData);

      // Update user's subscription plan
      await storage.updateUser(1, { subscriptionPlan: "premium" });
      
      res.json({ success: true, payment });
    } catch (error) {
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}