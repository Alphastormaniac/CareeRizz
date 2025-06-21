# Deployment Instructions for CareeRizz

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `careerizz` or your preferred name
3. Make it public (for free Netlify hosting)
4. Don't initialize with README (we have one already)

## Step 2: Push Code to GitHub

Your code is already initialized with Git. Complete the GitHub setup:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 3: Set Up Database

### Option A: Neon Database (Recommended - Free)
1. Go to [Neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new database
4. Copy the connection string (starts with `postgresql://`)

### Option B: Railway (Alternative)
1. Go to [Railway.app](https://railway.app)
2. Create a PostgreSQL database
3. Copy the connection string

## Step 4: Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Sign up with your GitHub account
3. Click "New site from Git"
4. Choose GitHub and select your repository
5. Configure build settings:
   - **Build command**: `vite build`
   - **Publish directory**: `dist/public`
   - **Node version**: 20
   - **Functions directory**: `netlify/functions`

## Step 5: Configure Environment Variables

In Netlify dashboard → Site settings → Environment variables, add:

```
DATABASE_URL=your_postgresql_connection_string
GOOGLE_CLIENT_ID=63409722555-o4gvo5jr964q8gmopt3m1qm4ocs7tgl0.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
SESSION_SECRET=your_random_32_character_string
NETLIFY_URL=https://your-app-name.netlify.app
NODE_ENV=production
```

## Step 6: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 client
4. Add your Netlify URL to authorized redirect URIs:
   - `https://your-app-name.netlify.app/api/auth/google/callback`

## Step 7: Deploy Database Schema

After deployment, run the database migration:

1. In Netlify → Site settings → Build & deploy → Environment variables
2. Or use a database GUI tool with your connection string
3. The application will create tables automatically on first run

## Step 8: Test Your Deployment

1. Visit your Netlify URL
2. Test Google authentication
3. Upload a resume to verify file handling
4. Check all features work correctly

## Troubleshooting

### Common Issues:

1. **Build fails**: Check Node version is set to 20
2. **Database connection fails**: Verify connection string format
3. **OAuth fails**: Ensure redirect URIs match exactly
4. **Functions timeout**: Check database connection pooling

### Logs:
- Netlify build logs: Site → Deploys → View logs
- Function logs: Site → Functions → View logs
- Real-time logs: `netlify dev` for local testing

## Free Hosting Limits

**Netlify Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month
- 125,000 function calls/month

**Neon Free Tier:**
- 3GB storage
- 1 database
- No connection limit during beta

Your application should run comfortably within these limits for development and moderate usage.