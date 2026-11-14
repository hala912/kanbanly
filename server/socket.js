

const boardlist = {};

function getBoardList(roomName) {//convert map into array of objects with socketId and username to send to client as json shaped array of objects
  return Array.from(boardlist[roomName], ([socketId, { username }]) => ({
   socketId: socketId,
   username
  }));
}
function setupSocket(io) {
 
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ boardId, username }) => {
      const roomName = `board-${boardId}`;
      socket.join(roomName);

      if (!boardlist[roomName]) {
        boardlist[roomName] = new Map();
      }
      boardlist[roomName].set(socket.id, { socketId: socket.id, username: username });

     console.log(`User ${username} joined room ${roomName}`);
      io.to(roomName).emit("listupdate", getBoardList(roomName));
    });

    socket.on("disconnect", () => {
      for (const roomName in boardlist) {
        if (boardlist[roomName].has(socket.id)) {
          console.log(`User disconnected: ${socket.id}`);
          boardlist[roomName].delete(socket.id);

          io.to(roomName).emit("listupdate", getBoardList(roomName));
        }
        if (boardlist[roomName].size === 0) {
          delete boardlist[roomName];
        }
      }
    });
  });
}

module.exports = { setupSocket };