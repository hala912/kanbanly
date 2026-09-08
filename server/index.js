// ============================================
// 1. IMPORTS & CONFIGURATION
// ============================================
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const DATABASE_URL = process.env.DATABASE_URL;

// ============================================
// 2. DATABASE CONNECTION
// ============================================
const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected pool error:", err);
});

// ============================================
// 3. EXPRESS APP INITIALIZATION
// ============================================
const app = express();

// ============================================
// 4. MIDDLEWARE
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ============================================
// 5. ROUTES
// ============================================

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Online Kanban API", 
    version: "1.0.0" 
  });
});

// Database test
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as current_time");
    res.status(200).json({ 
      success: true, 
      data: result.rows[0] 
    });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ 
      success: false, 
      error: "Database connection failed" 
    });
  }
});

// ============================================
// 6. ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: "Route not found",
    path: req.path 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ 
    success: false, 
    error: err.message || "Internal server error" 
  });
});

// ============================================
// 7. SERVER START
// ============================================
app.listen(PORT, () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🗄️  Database: ${DATABASE_URL ? "Connected" : "Not configured"}\n`);
});