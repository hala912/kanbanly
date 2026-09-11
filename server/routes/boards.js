const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

router.post("/boards", verifyToken, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware that sets req.user

  try {
    const result = await pool.query(
      "INSERT INTO boards (name, owner_id) VALUES ($1, $2) RETURNING *",
      [name, userId],
    );

    const newBoard = result.rows[0];

    await pool.query(
      "INSERT INTO board_members (board_id, user_id,role) VALUES ($1, $2, $3)",
      [newBoard.id, userId, "admin"],
    );

    res.json(newBoard);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating board");
  }
});

router.post("/boards/:boardId/members", verifyToken, async (req, res) => {
  const { email } = req.body;
  const { boardId } = req.params;
  const userId = req.user.id; 

  try {
  const boardResult = await pool.query(
    "SELECT * FROM boards WHERE id = $1 AND owner_id = $2",
    [boardId, userId],
  );

  if (boardResult.rows.length === 0) {
    return res.status(403).send("You are not the owner of this board");
  }else{
 
  const result = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const member_id = result.rows[0].id;

    await pool.query(
      "INSERT INTO board_members (board_id, user_id, role) VALUES ($1, $2, $3)",
      [boardId, member_id, "member"],
    );
  }
    res.send("Member added to board");
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding member to board");
  }

});

module.exports = router;
