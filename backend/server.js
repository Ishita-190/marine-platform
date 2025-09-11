const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/species', require('./routes/species'));
app.use('/api/occurrences', require('./routes/occurrences'));
app.use('/api/debug', require('./routes/debug'));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Marine Platform API', 
    endpoints: [
      'GET /api/health',
      'GET /api/species',
      'GET /api/occurrences'
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Marine Platform API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});