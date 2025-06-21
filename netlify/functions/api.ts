import express from 'express';
import serverless from 'serverless-http';

const app = express();

// Configure Express for serverless environment
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working on Netlify!' });
});

// Placeholder routes for now
app.get('/api/user', (req, res) => {
  res.status(401).json({ message: 'Authentication required' });
});

app.post('/api/login', (req, res) => {
  res.status(400).json({ message: 'Login not implemented yet' });
});

app.get('/api/auth/google', (req, res) => {
  res.redirect('/?error=oauth_not_configured');
});

// Create serverless handler
export const handler = serverless(app);