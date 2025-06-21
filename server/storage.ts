import {
  users, resumes, courses, userCourses, mentors, mentorSessions,
  projects, skillBadges, interviewPerformance, payments,
  type User, type InsertUser, type Resume, type InsertResume,
  type Course, type InsertCourse, type UserCourse, type InsertUserCourse,
  type Mentor, type InsertMentor, type MentorSession, type InsertMentorSession,
  type Project, type InsertProject, type SkillBadge, type InsertSkillBadge,
  type InterviewPerformance, type InsertInterviewPerformance,
  type Payment, type InsertPayment
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Resume operations
  getResumeByUserId(userId: number): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, updates: Partial<Resume>): Promise<Resume | undefined>;

  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getRecommendedCourses(skills: string[]): Promise<Course[]>;
  getUserCourses(userId: number): Promise<UserCourse[]>;
  enrollUserInCourse(enrollment: InsertUserCourse): Promise<UserCourse>;
  updateCourseProgress(userId: number, courseId: number, progress: number): Promise<UserCourse | undefined>;

  // Mentor operations
  getAllMentors(): Promise<Mentor[]>;
  getMentor(id: number): Promise<Mentor | undefined>;
  getTopMentors(): Promise<Mentor[]>;
  getMentorSessions(userId: number): Promise<MentorSession[]>;
  createMentorSession(session: InsertMentorSession): Promise<MentorSession>;

  // Project operations
  getUserProjects(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;

  // Skill badge operations
  getUserBadges(userId: number): Promise<SkillBadge[]>;
  awardBadge(badge: InsertSkillBadge): Promise<SkillBadge>;

  // Interview performance operations
  getUserInterviewPerformance(userId: number): Promise<InterviewPerformance[]>;
  createInterviewPerformance(performance: InsertInterviewPerformance): Promise<InterviewPerformance>;

  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  getUserPayments(userId: number): Promise<Payment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private resumes: Map<number, Resume> = new Map();
  private courses: Map<number, Course> = new Map();
  private userCourses: Map<number, UserCourse> = new Map();
  private mentors: Map<number, Mentor> = new Map();
  private mentorSessions: Map<number, MentorSession> = new Map();
  private projects: Map<number, Project> = new Map();
  private skillBadges: Map<number, SkillBadge> = new Map();
  private interviewPerformances: Map<number, InterviewPerformance> = new Map();
  private payments: Map<number, Payment> = new Map();

  private currentUserId = 1;
  private currentResumeId = 1;
  private currentCourseId = 1;
  private currentUserCourseId = 1;
  private currentMentorId = 1;
  private currentMentorSessionId = 1;
  private currentProjectId = 1;
  private currentSkillBadgeId = 1;
  private currentInterviewPerformanceId = 1;
  private currentPaymentId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed default user
    const defaultUser: User = {
      id: 1,
      username: "rahul_sharma",
      password: "password123",
      email: "rahul.sharma@example.com",
      firstName: "Rahul",
      lastName: "Sharma",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      phoneNumber: null,
      googleId: null,
      linkedinId: null,
      githubId: null,
      authProvider: "email",
      careerScore: 78,
      coursesCompleted: 12,
      badges: 8,
      mentorSessions: 5,
      subscriptionPlan: "free",
      subscriptionExpiry: null,
      resumeAnalysisCount: 0,
      freeAnalysisUsed: false,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;

    // Seed courses
    const sampleCourses: Course[] = [
      {
        id: 1,
        title: "AWS Cloud Practitioner",
        description: "Master cloud fundamentals and AWS services",
        provider: "AWS Training",
        price: "2999",
        duration: "32 hours",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        affiliateLink: "https://coursera.org/aws-cloud",
        skills: ["AWS", "Cloud Computing", "DevOps"],
        level: "beginner"
      },
      {
        id: 2,
        title: "Docker & Kubernetes",
        description: "Containerization and orchestration",
        provider: "Docker Inc",
        price: "1999",
        duration: "24 hours",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        affiliateLink: "https://coursera.org/docker-kubernetes",
        skills: ["Docker", "Kubernetes", "DevOps"],
        level: "intermediate"
      }
    ];
    sampleCourses.forEach(course => this.courses.set(course.id, course));
    this.currentCourseId = 3;

    // Seed mentors
    const sampleMentors: Mentor[] = [
      {
        id: 1,
        name: "Priya Nair",
        title: "Senior SDE at Amazon",
        company: "Amazon",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: "4.9",
        hourlyRate: "1500",
        specialties: ["System Design", "AWS", "Leadership"],
        bio: "Senior Software Engineer with 8+ years at Amazon"
      },
      {
        id: 2,
        name: "Arjun Singh",
        title: "Tech Lead at Flipkart",
        company: "Flipkart",
        profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: "4.8",
        hourlyRate: "1200",
        specialties: ["Frontend", "React", "Team Management"],
        bio: "Tech Lead specializing in scalable web applications"
      }
    ];
    sampleMentors.forEach(mentor => this.mentors.set(mentor.id, mentor));
    this.currentMentorId = 3;

    // Seed user projects
    const sampleProject: Project = {
      id: 1,
      userId: 1,
      title: "E-commerce Dashboard",
      description: "React.js dashboard with real-time analytics",
      technologies: ["React", "Node.js", "MongoDB"],
      liveUrl: "https://demo-ecommerce.com",
      githubUrl: "https://github.com/rahul/ecommerce-dashboard",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      status: "live",
      createdAt: new Date()
    };
    this.projects.set(1, sampleProject);
    this.currentProjectId = 2;

    // Seed skill badges
    const sampleBadges: SkillBadge[] = [
      {
        id: 1,
        userId: 1,
        badgeName: "React Expert",
        badgeType: "technical",
        earnedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        badgeName: "Git Master",
        badgeType: "tool",
        earnedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        badgeName: "Problem Solver",
        badgeType: "soft-skill",
        earnedAt: new Date()
      }
    ];
    sampleBadges.forEach(badge => this.skillBadges.set(badge.id, badge));
    this.currentSkillBadgeId = 4;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      createdAt: new Date(),
      lastLogin: new Date(),
      phoneNumber: insertUser.phoneNumber || null,
      googleId: insertUser.googleId || null,
      linkedinId: insertUser.linkedinId || null,
      githubId: insertUser.githubId || null,
      authProvider: insertUser.authProvider || "email",
      subscriptionPlan: insertUser.subscriptionPlan || "free",
      subscriptionExpiry: insertUser.subscriptionExpiry || null,
      resumeAnalysisCount: insertUser.resumeAnalysisCount || 0,
      freeAnalysisUsed: insertUser.freeAnalysisUsed || false
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Resume operations
  async getResumeByUserId(userId: number): Promise<Resume | undefined> {
    return Array.from(this.resumes.values()).find(resume => resume.userId === userId);
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const resume: Resume = {
      ...insertResume,
      id: this.currentResumeId++,
      uploadedAt: new Date()
    };
    this.resumes.set(resume.id, resume);
    return resume;
  }

  async updateResume(id: number, updates: Partial<Resume>): Promise<Resume | undefined> {
    const resume = this.resumes.get(id);
    if (!resume) return undefined;
    
    const updatedResume = { ...resume, ...updates };
    this.resumes.set(id, updatedResume);
    return updatedResume;
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getRecommendedCourses(skills: string[]): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => 
      course.skills?.some(skill => skills.includes(skill))
    );
  }

  async getUserCourses(userId: number): Promise<UserCourse[]> {
    return Array.from(this.userCourses.values()).filter(uc => uc.userId === userId);
  }

  async enrollUserInCourse(enrollment: InsertUserCourse): Promise<UserCourse> {
    const userCourse: UserCourse = {
      ...enrollment,
      id: this.currentUserCourseId++,
      enrolledAt: new Date(),
      completedAt: null
    };
    this.userCourses.set(userCourse.id, userCourse);
    return userCourse;
  }

  async updateCourseProgress(userId: number, courseId: number, progress: number): Promise<UserCourse | undefined> {
    const userCourse = Array.from(this.userCourses.values()).find(uc => 
      uc.userId === userId && uc.courseId === courseId
    );
    if (!userCourse) return undefined;

    const updatedUserCourse = { 
      ...userCourse, 
      progress,
      isCompleted: progress >= 100,
      completedAt: progress >= 100 ? new Date() : null
    };
    this.userCourses.set(userCourse.id, updatedUserCourse);
    return updatedUserCourse;
  }

  // Mentor operations
  async getAllMentors(): Promise<Mentor[]> {
    return Array.from(this.mentors.values());
  }

  async getMentor(id: number): Promise<Mentor | undefined> {
    return this.mentors.get(id);
  }

  async getTopMentors(): Promise<Mentor[]> {
    return Array.from(this.mentors.values())
      .sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"))
      .slice(0, 5);
  }

  async getMentorSessions(userId: number): Promise<MentorSession[]> {
    return Array.from(this.mentorSessions.values()).filter(session => session.userId === userId);
  }

  async createMentorSession(session: InsertMentorSession): Promise<MentorSession> {
    const mentorSession: MentorSession = {
      ...session,
      id: this.currentMentorSessionId++,
      createdAt: new Date()
    };
    this.mentorSessions.set(mentorSession.id, mentorSession);
    return mentorSession;
  }

  // Project operations
  async getUserProjects(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.userId === userId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = {
      ...insertProject,
      id: this.currentProjectId++,
      createdAt: new Date()
    };
    this.projects.set(project.id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Skill badge operations
  async getUserBadges(userId: number): Promise<SkillBadge[]> {
    return Array.from(this.skillBadges.values()).filter(badge => badge.userId === userId);
  }

  async awardBadge(insertBadge: InsertSkillBadge): Promise<SkillBadge> {
    const badge: SkillBadge = {
      ...insertBadge,
      id: this.currentSkillBadgeId++,
      earnedAt: new Date()
    };
    this.skillBadges.set(badge.id, badge);
    return badge;
  }

  // Interview performance operations
  async getUserInterviewPerformance(userId: number): Promise<InterviewPerformance[]> {
    return Array.from(this.interviewPerformances.values()).filter(perf => perf.userId === userId);
  }

  async createInterviewPerformance(insertPerformance: InsertInterviewPerformance): Promise<InterviewPerformance> {
    const performance: InterviewPerformance = {
      ...insertPerformance,
      id: this.currentInterviewPerformanceId++,
      completedAt: new Date()
    };
    this.interviewPerformances.set(performance.id, performance);
    return performance;
  }

  // Payment operations
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const payment: Payment = {
      ...insertPayment,
      id: this.currentPaymentId++,
      createdAt: new Date()
    };
    this.payments.set(payment.id, payment);
    return payment;
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(payment => payment.userId === userId);
  }
}

// Use PostgreSQL storage in production, memory storage in development
export const storage = process.env.NODE_ENV === 'production' 
  ? new DrizzleStorage() 
  : new MemStorage();

// PostgreSQL storage implementation
class DrizzleStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Resume operations
  async getResumeByUserId(userId: number): Promise<Resume | undefined> {
    const result = await db.select().from(resumes).where(eq(resumes.userId, userId));
    return result[0];
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const result = await db.insert(resumes).values(resume).returning();
    return result[0];
  }

  async updateResume(id: number, updates: Partial<Resume>): Promise<Resume | undefined> {
    const result = await db.update(resumes).set(updates).where(eq(resumes.id, id)).returning();
    return result[0];
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const result = await db.select().from(courses).where(eq(courses.id, id));
    return result[0];
  }

  async getRecommendedCourses(skills: string[]): Promise<Course[]> {
    return await db.select().from(courses).limit(6);
  }

  async getUserCourses(userId: number): Promise<UserCourse[]> {
    return await db.select().from(userCourses).where(eq(userCourses.userId, userId));
  }

  async enrollUserInCourse(enrollment: InsertUserCourse): Promise<UserCourse> {
    const result = await db.insert(userCourses).values(enrollment).returning();
    return result[0];
  }

  async updateCourseProgress(userId: number, courseId: number, progress: number): Promise<UserCourse | undefined> {
    const result = await db.update(userCourses)
      .set({ progress })
      .where(and(eq(userCourses.userId, userId), eq(userCourses.courseId, courseId)))
      .returning();
    return result[0];
  }

  // Mentor operations
  async getAllMentors(): Promise<Mentor[]> {
    return await db.select().from(mentors);
  }

  async getMentor(id: number): Promise<Mentor | undefined> {
    const result = await db.select().from(mentors).where(eq(mentors.id, id));
    return result[0];
  }

  async getTopMentors(): Promise<Mentor[]> {
    return await db.select().from(mentors).limit(3);
  }

  async getMentorSessions(userId: number): Promise<MentorSession[]> {
    return await db.select().from(mentorSessions).where(eq(mentorSessions.userId, userId));
  }

  async createMentorSession(session: InsertMentorSession): Promise<MentorSession> {
    const result = await db.insert(mentorSessions).values(session).returning();
    return result[0];
  }

  // Project operations
  async getUserProjects(userId: number): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.userId, userId));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const result = await db.update(projects).set(updates).where(eq(projects.id, id)).returning();
    return result[0];
  }

  // Skill badge operations
  async getUserBadges(userId: number): Promise<SkillBadge[]> {
    return await db.select().from(skillBadges).where(eq(skillBadges.userId, userId));
  }

  async awardBadge(badge: InsertSkillBadge): Promise<SkillBadge> {
    const result = await db.insert(skillBadges).values(badge).returning();
    return result[0];
  }

  // Interview performance operations
  async getUserInterviewPerformance(userId: number): Promise<InterviewPerformance[]> {
    return await db.select().from(interviewPerformance).where(eq(interviewPerformance.userId, userId));
  }

  async createInterviewPerformance(performance: InsertInterviewPerformance): Promise<InterviewPerformance> {
    const result = await db.insert(interviewPerformance).values(performance).returning();
    return result[0];
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.id, id));
    return result[0];
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.userId, userId));
  }
}
