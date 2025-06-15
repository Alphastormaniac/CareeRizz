import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username"),
  password: text("password"),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  profilePicture: text("profile_picture"),
  phoneNumber: text("phone_number"),
  googleId: text("google_id"),
  linkedinId: text("linkedin_id"),
  githubId: text("github_id"),
  authProvider: text("auth_provider").notNull().default("email"), // email, google, linkedin, github, phone
  careerScore: integer("career_score").default(0),
  coursesCompleted: integer("courses_completed").default(0),
  badges: integer("badges").default(0),
  mentorSessions: integer("mentor_sessions").default(0),
  subscriptionPlan: text("subscription_plan").default("free"), // free, premium, premium_plus
  subscriptionExpiry: timestamp("subscription_expiry"),
  resumeAnalysisCount: integer("resume_analysis_count").default(0),
  freeAnalysisUsed: boolean("free_analysis_used").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login")
});

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  interval: text("interval").notNull(), // monthly, annual
  features: text("features").array(),
  maxResumeAnalysis: integer("max_resume_analysis").default(-1), // -1 for unlimited
  maxMentorSessions: integer("max_mentor_sessions").default(-1),
  hasAdvancedInsights: boolean("has_advanced_insights").default(false),
  hasProjectSandbox: boolean("has_project_sandbox").default(false),
  hasPrioritySupport: boolean("has_priority_support").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  extractedSkills: text("extracted_skills").array(),
  atsScore: integer("ats_score"),
  keywordScore: integer("keyword_score"),
  uploadedAt: timestamp("uploaded_at").defaultNow()
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  provider: text("provider").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration").notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  imageUrl: text("image_url"),
  affiliateLink: text("affiliate_link"),
  skills: text("skills").array(),
  level: text("level").notNull()
});

export const userCourses = pgTable("user_courses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").default(0),
  isCompleted: boolean("is_completed").default(false),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at")
});

export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  profilePicture: text("profile_picture"),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }).notNull(),
  specialties: text("specialties").array(),
  bio: text("bio")
});

export const mentorSessions = pgTable("mentor_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  mentorId: integer("mentor_id").notNull(),
  sessionDate: timestamp("session_date").notNull(),
  duration: integer("duration").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("scheduled"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  imageUrl: text("image_url"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow()
});

export const skillBadges = pgTable("skill_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badgeName: text("badge_name").notNull(),
  badgeType: text("badge_type").notNull(),
  earnedAt: timestamp("earned_at").defaultNow()
});

export const interviewPerformance = pgTable("interview_performance", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  sessionType: text("session_type").notNull(),
  technicalScore: integer("technical_score"),
  communicationScore: integer("communication_score"),
  problemSolvingScore: integer("problem_solving_score"),
  feedback: text("feedback"),
  completedAt: timestamp("completed_at").defaultNow()
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpayOrderId: text("razorpay_order_id"),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  status: text("status").notNull(),
  paymentType: text("payment_type").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastLogin: true
});

export const insertSubscriptionPlanSchema = createInsertSchema(subscriptionPlans).omit({
  id: true,
  createdAt: true
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  uploadedAt: true
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true
});

export const insertUserCourseSchema = createInsertSchema(userCourses).omit({
  id: true,
  enrolledAt: true,
  completedAt: true
});

export const insertMentorSchema = createInsertSchema(mentors).omit({
  id: true
});

export const insertMentorSessionSchema = createInsertSchema(mentorSessions).omit({
  id: true,
  createdAt: true
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true
});

export const insertSkillBadgeSchema = createInsertSchema(skillBadges).omit({
  id: true,
  earnedAt: true
});

export const insertInterviewPerformanceSchema = createInsertSchema(interviewPerformance).omit({
  id: true,
  completedAt: true
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSubscriptionPlan = z.infer<typeof insertSubscriptionPlanSchema>;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertUserCourse = z.infer<typeof insertUserCourseSchema>;
export type UserCourse = typeof userCourses.$inferSelect;

export type InsertMentor = z.infer<typeof insertMentorSchema>;
export type Mentor = typeof mentors.$inferSelect;

export type InsertMentorSession = z.infer<typeof insertMentorSessionSchema>;
export type MentorSession = typeof mentorSessions.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertSkillBadge = z.infer<typeof insertSkillBadgeSchema>;
export type SkillBadge = typeof skillBadges.$inferSelect;

export type InsertInterviewPerformance = z.infer<typeof insertInterviewPerformanceSchema>;
export type InterviewPerformance = typeof interviewPerformance.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
