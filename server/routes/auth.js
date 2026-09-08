const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool  = require("../db");

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

module.exports = router;
