require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const submitFeedbackHandler = require('../api/submit-feedback').default; // Import your serverless function

const app = express();
const PORT = process.env.API_PORT || 3001; // Use a different port than Vite

app.use(bodyParser.json());

// Allow CORS for local development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Route for your feedback submission
app.post('/api/submit-feedback', async (req, res) => {
  // Adapt the serverless function handler to Express req/res
  await submitFeedbackHandler(req, res);
});

// Catch-all for other /api routes if needed, or return 404
app.use('/api/*', (req, res) => {
  res.status(404).send('API endpoint not found');
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});
