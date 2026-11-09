const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  /*
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }
*/
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
      [email.trim().toLowerCase(), passwordHash],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    if (err.code === "23505") {
      return res.status(409).json({ error: "This email is already registered" });
    }
    if (err.code === "42P01") {
      return res.status(500).json({ error: "Server: the users table does not exist" });
    }
    if (err.code === "42703") {
      return res.status(500).json({ error: `Server: missing column (${err.message})` });
    }
    if (err.code === "ECONNREFUSED") {
      return res.status(500).json({ error: "Server: cannot connect to the database" });
    }
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Server: JWT_SECRET is missing in .env" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email.trim().toLowerCase(),
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "No account with this email" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { id: user.id, email: user.email, created_at: user.created_at },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    if (err.code === "42P01") {
      return res.status(500).json({ error: "Server: the users table does not exist" });
    }
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

module.exports = router;