const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
// Create a new user account with a protected password.
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING email, created_at",
      [email, passwordHash],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});
// Check a user's details and return their login information.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the account that matches the submitted email.
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).send("Invalid email or password");
    }
    const user = result.rows[0];
    // Compare the submitted password with the protected password in the database.
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }
    //push the user id and email into a JWT token that expires in 1 hour
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, id: user.id, email: user.email, created_at: user.created_at });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

module.exports = router;
