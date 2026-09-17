const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/boards/:boardId/columns", verifyToken, async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user.id;

  if (!boardId || !userId) {
    return res.status(400).json({ error: "Missing boardId or userId" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardId, userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not a member of this board" });
    }

    const columsResult = await pool.query(
      "SELECT * FROM columns WHERE board_id = $1 ORDER BY position ASC",
      [boardId],
    );
    res.json(columsResult.rows);
  } catch (error) {
    console.error("Error fetching columns:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/boards/:boardId/columns", verifyToken, async (req, res) => {
  const { boardId } = req.params;
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM board_members WHERE board_id = $1 AND user_id = $2",
      [boardId, userId],
    );
    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not a member of this board" });
    }
    const Highpostion = await pool.query(
      "SELECT MAX(position) as max_position FROM columns WHERE board_id = $1",
      [boardId],
    );
    //const position = Highpostion.rows[0].max_position + 1 || 1 ; this will save you from the falsy js NAn but it's not obvios enough, so I prefer the ternary operator
    const position = Highpostion.rows[0].max_position === null ? 0 : Highpostion.rows[0].max_position + 1;
    const insertResult = await pool.query(
      "INSERT INTO columns (title, position, board_id) VALUES ($1, $2, $3) RETURNING *",
      [title, position, boardId],
    );
    res.json(insertResult.rows[0]);
  } catch (error) {
    console.error("Error inserting column:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/boards/:boardId/columns/:columnId", verifyToken, async (req, res) => {

  const { boardId, columnId } = req.params;
  const userId = req.user.id;

  try {
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
      "DELETE FROM columns WHERE id = $1 AND board_id = $2 RETURNING *",
      [columnId, boardId],
    );
    if (deleteResult.rows.length === 0) {
      return res.status(404).json({ error: "Column not found" });
    }

    res.json(deleteResult.rows[0]);

  } catch (error) {
    console.error("Error deleting column:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
})

router.patch("/boards/:boardId/columns/:columnId", verifyToken, async (req, res) => {
  const { boardId, columnId } = req.params;
  const { title } = req.body;
  const userId = req.user.id;

    try {
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
      "UPDATE columns SET title = $1 WHERE id = $2 AND board_id = $3 RETURNING *",
      [title, columnId, boardId],
    );
    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: "Column not found" });
    }
    
    res.json(updateResult.rows[0]);
  
  
  
  }catch (error) {
    console.error("Error checking editing permissions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
})

module.exports = router;