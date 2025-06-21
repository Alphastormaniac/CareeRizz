# CareeRizz - AI-Powered Career Development Platform

CareeRizz is a comprehensive career development platform that provides AI-powered career insights, resume analysis, personalized learning pathways, mentorship connections, and premium subscription features.

## Features

- 🔐 **Multi-Platform Authentication** - Google, GitHub, LinkedIn, and local auth
- 📄 **AI Resume Analysis** - ATS scoring and skill extraction
- 🎯 **Personalized Learning Pathways** - Course recommendations based on skills
- 👥 **Mentorship Platform** - Connect with industry experts
- 💼 **Portfolio Builder** - Showcase projects and achievements
- 🎤 **Interview Preparation** - Mock interviews and performance tracking
- 💳 **Premium Subscriptions** - Tiered pricing with Razorpay integration

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS + shadcn/ui components
- TanStack Query for state management
- Wouter for routing

### Backend
- Node.js with Express
- PostgreSQL with Drizzle ORM
- Passport.js for authentication
- Session-based auth with PostgreSQL store

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd careerizz
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database
DATABASE_URL=your_postgresql_url

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session Secret
SESSION_SECRET=your_session_secret
```

4. Push database schema:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

## Deployment

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist/public`
- Add environment variables in Netlify dashboard

### Environment Variables for Production

```
DATABASE_URL=your_production_postgresql_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_secure_session_secret
NETLIFY_URL=your_netlify_domain
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and config
├── server/                 # Backend Express application
│   ├── auth.ts            # Authentication setup
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── db.ts              # Database connection
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
├── netlify/               # Netlify functions
│   └── functions/
└── dist/                  # Build output
```

## License

MIT License