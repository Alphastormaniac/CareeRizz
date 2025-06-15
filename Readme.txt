# CareeRizz

## Overview

CareeRizz is a comprehensive career development platform built with a modern full-stack architecture. The application provides AI-powered career insights, resume analysis, personalized learning pathways, mentorship connections, portfolio building, interview preparation, and premium subscription features. It's designed to help users advance their careers through data-driven recommendations and professional development tools.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **File Uploads**: Multer for resume file handling
- **Session Management**: Express sessions with PostgreSQL store

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type-safe database operations
- **Migrations**: Drizzle Kit for schema migrations

## Key Components

### Database Schema
The application uses a comprehensive PostgreSQL schema with the following core entities:
- **Users**: User profiles with career metrics and subscription plans
- **Resumes**: Resume files with AI-extracted skills and ATS scoring
- **Courses**: Learning content with affiliate links and skill mappings
- **Mentors**: Professional mentors with expertise areas
- **Projects**: User portfolio projects with technology stacks
- **Skill Badges**: Gamified achievement system
- **Payments**: Subscription and transaction management

### API Structure
- **User Management**: `/api/user` - Profile data and statistics
- **Resume Analysis**: `/api/resume` - Upload, analysis, and ATS scoring
- **Learning**: `/api/courses` - Personalized course recommendations
- **Mentorship**: `/api/mentors` - Mentor discovery and session booking
- **Portfolio**: `/api/projects` and `/api/badges` - Project showcase
- **Payments**: `/api/payment` - Razorpay integration for subscriptions

### Frontend Components
- **Dashboard**: Main user interface with career overview
- **Resume Analysis**: File upload with AI-powered insights
- **Learning Pathway**: Personalized course recommendations
- **Mentorship Section**: Mentor discovery and session management
- **Portfolio Builder**: Project showcase and skill badges
- **Interview Prep**: Mock interviews and performance tracking
- **Payment Section**: Subscription management with Razorpay

## Data Flow

1. **User Authentication**: Session-based authentication with PostgreSQL session store
2. **Resume Processing**: File upload → skill extraction → ATS scoring → database storage
3. **AI Recommendations**: User skills → course matching → personalized suggestions
4. **Career Scoring**: Multiple metrics aggregation → career score calculation
5. **Payment Processing**: Razorpay integration → subscription validation → feature access

## External Dependencies

### Core Dependencies
- **Database**: PostgreSQL with Neon Database serverless driver
- **Payment Gateway**: Razorpay for Indian market payment processing
- **File Storage**: Local file system for resume uploads
- **UI Framework**: Radix UI for accessible component primitives

### Development Tools
- **TypeScript**: Full-stack type safety
- **ESBuild**: Production bundling for server code
- **Tailwind CSS**: Utility-first styling framework
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 
- **Database**: PostgreSQL 16 module
- **Development Server**: Vite dev server with Express API proxy
- **Hot Reload**: Vite HMR for frontend, tsx for backend development

### Production Build
- **Frontend**: Vite build output to `dist/public`
- **Backend**: ESBuild bundle to `dist/index.js`
- **Environment**: Production Node.js with built assets

### Configuration
- **Environment Variables**: `DATABASE_URL` for PostgreSQL connection
- **Session Security**: PostgreSQL-backed session storage
- **File Uploads**: Local filesystem with configurable upload directory

## Changelog

```
Changelog:
- June 15, 2025. Initial setup
- June 15, 2025. Enhanced freemium platform with modern authentication
  * Added multi-platform authentication (Google, LinkedIn, GitHub, Phone)
  * Implemented three-tier subscription model (Free, Premium Pro ₹299-₹2390, Premium+ Elite ₹799-₹6392)
  * Created enhanced resume analysis with freemium limitations
  * Built modern landing page with futuristic UI elements
  * Integrated enhanced payment section with Razorpay
  * Added comprehensive auth modal with social login options
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
