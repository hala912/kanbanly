const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/columns/:columnId/cards", verifyToken, async (req, res) => {
  const { columnId } = req.params;
  const userId = req.user.id;

  if (!columnId || !userId) {
    return res.status(400).json({ error: "Missing columnId or userId" });
  }
  try {
    const boardResult = await pool.query(
      "SELECT board_id FROM columns WHERE id = $1",
      [columnId],
    );
    if (boardResult.rows.length === 0) {
      return res.status(404).json({ error: "Column not found" });
    }
    const boardId = boardResult.rows[0].board_id;

    const result = await pool.query(
      "SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardId, userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not a member of this board" });
    }

    const cardsResult = await pool.query(
      "SELECT * FROM cards WHERE column_id = $1 ORDER BY position ASC",
      [columnId],
    );
    res.json(cardsResult.rows);
  } catch (error) {
    console.error("Error fetching cards:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/columns/:columnId/cards", verifyToken, async (req, res) => {
  const { columnId } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const boardResult = await pool.query(
      "SELECT board_id FROM columns WHERE id = $1",
      [columnId],
    );
    if (boardResult.rows.length === 0) {
      return res.status(404).json({ error: "Column not found" });
    }
    const boardId = boardResult.rows[0].board_id;

    const result = await pool.query(
      "SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardId, userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not a member of this board" });
    }
    
    // Add the new card to the database

    const Highpostion = await pool.query(
      "SELECT MAX(position) as max_position FROM cards WHERE column_id = $1",
      [columnId],
    );
    const position =
      Highpostion.rows[0].max_position === null
        ? 0
        : Highpostion.rows[0].max_position + 1;

    const insertResult = await pool.query(
      "INSERT INTO cards (title, description, position, column_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, position, columnId],
    );

    res.json(insertResult.rows[0]);
  } catch (error) {
    console.error("Error checking adding card permissions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/columns/:columnId/cards/:cardId", verifyToken, async (req, res) => {
  const { columnId, cardId } = req.params;
  const userId = req.user.id;

  try {
    const boardResult = await pool.query(
      "SELECT board_id FROM columns WHERE id = $1",
      [columnId],
    );
    if (boardResult.rows.length === 0) {
      return res.status(404).json({ error: "Column not found" });
    }
    const boardId = boardResult.rows[0].board_id;

    const result = await pool.query(
      "SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardId, userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not a member of this board" });
    }

    const deleteResult = await pool.query(
      "DELETE FROM cards WHERE id = $1 AND column_id = $2",
      [cardId, columnId],
    );

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.put("/columns/:columnId/cards/:cardId", verifyToken, async (req, res) => {
  const { columnId, cardId } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const boardResult = await pool.query(
      "SELECT board_id FROM columns WHERE id = $1",
      [columnId],
    );
    if (boardResult.rows.length === 0) {
      return res.status(404).json({ error: "Column not found" });
    }
    const boardId = boardResult.rows[0].board_id;

    const result = await pool.query(
      "SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardId, userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not a member of this board" });
    }

    const updateResult = await pool.query(
      "UPDATE cards SET title = $1, description = $2 WHERE id = $3 AND column_id = $4",
      [title, description, cardId, columnId],
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json({ message: "Card updated successfully" });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})