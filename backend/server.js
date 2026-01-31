const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection with enhanced error handling
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Add connection timeout
  connectionTimeoutMillis: 5000,
  // Add idle timeout
  idleTimeoutMillis: 30000,
});

// Test database connection with retry logic
const testConnection = async (attempt = 1, maxAttempts = 3) => {
  console.log(`\nAttempting to connect to database (Attempt ${attempt}/${maxAttempts})...`);
  
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    
    console.log('✅ Successfully connected to the database');
    console.log('   Database time:', result.rows[0].now);
    
    // Check if users table exists
    try {
      const tableCheck = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'users'
        );
      `);
      
      if (tableCheck.rows[0].exists) {
        console.log('✅ Users table exists');
      } else {
        console.log('⚠️  Users table does not exist. Running migrations...');
        // Run migrations here if needed
      }
    } catch (tableError) {
      console.error('Error checking for users table:', tableError);
    }
    
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', {
      code: err.code,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
    
    if (attempt < maxAttempts) {
      console.log(`Retrying in 3 seconds... (${maxAttempts - attempt} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return testConnection(attempt + 1, maxAttempts);
    }
    
    console.error('❌ Failed to connect to database after multiple attempts');
    console.log('\nTroubleshooting Tips:');
    console.log('1. Verify your PostgreSQL service is running');
    console.log('2. Check your .env file for correct credentials');
    console.log('3. Ensure the database exists: ' + process.env.DB_NAME);
    console.log('4. Check if the user has proper permissions');
    console.log('5. Verify PostgreSQL is listening on port: ' + process.env.DB_PORT);
    
    return false;
  }
};

// Initialize database connection
testConnection().then(success => {
  if (!success) {
    console.log('\nPlease fix the database connection issues and restart the server.');
    process.exit(1);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/species', require('./routes/species'));
app.use('/api/occurrences', require('./routes/occurrences'));
app.use('/api/debug', require('./routes/debug'));

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert user into database
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, hashedPassword]
    );
    
    // Return user data (excluding password)
    const user = result.rows[0];
    res.status(201).json({ user });
    
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Server error during registration' });
  }
});

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

// Root health check for Railway
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Marine Platform API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});