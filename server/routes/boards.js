const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/boards", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT * FROM boards
       WHERE owner_id = $1
      OR id IN (SELECT board_id FROM board_members WHERE user_id = $1)`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching boards");
  }
});
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

router.delete("/boards/:boardId", verifyToken, async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM boards WHERE id = $1 AND owner_id = $2",
      [boardId, userId],
    );
    if (result.rowCount === 0) {
      return res.status(403).json({ error: "You are not the owner of this board" });
    }
    const io = req.app.get("io");
    io.to(`board_${boardId}`).emit("boardDeleted", { boardId });

    res.json({ message: "Board deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting board" });
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
    } else {
      const result = await pool.query("SELECT id FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows.length === 0) {
        return res.status(404).send("User not found");
      }
      const member_id = result.rows[0].id;

      if (member_id === userId) {
        return res.status(400).send("You cannot add yourself as a member");
      }
      //check if already a member
      const check = await pool.query(
        "SELECT 1 FROM board_members WHERE board_id = $1 AND user_id = $2",
        [boardId, member_id],
      );
      if (check.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "User is already a member of this board" });
      }
      await pool.query(
        "INSERT INTO board_members (board_id, user_id, role) VALUES ($1, $2, $3)",
        [boardId, member_id, "member"],
      );
    }

    res.json({ message: "Member added to board" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding member to board" });
  }
});

router.get("/boards/:boardId/members", verifyToken, async (req, res) => {
  const { boardId } = req.params;

  try {
    // only members can see the list
    const check = await pool.query(
      "SELECT 1 FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardId, req.user.id],
    );
    if (check.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not a member of this board" });
    }

    const result = await pool.query(
      `SELECT u.id, u.email, bm.role
       FROM board_members bm
       JOIN users u ON u.id = bm.user_id
       WHERE bm.board_id = $1`,
      [boardId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching members" });
  }
});

module.exports = router;
