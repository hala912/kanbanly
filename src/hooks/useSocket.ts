import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = (boardIdNumber: number | undefined) => {

     const queryClient = useQueryClient()

    useEffect(() => {
      
      if (!boardIdNumber) return;
    
      const socket = io("http://localhost:3000");
    
      const refetchCards = () => {
        queryClient.invalidateQueries({ queryKey: ["cards", boardIdNumber] });
      };
    
      const refetchColumns = () => {
        queryClient.invalidateQueries({ queryKey: ["columns", boardIdNumber] });
      };
      socket.on("connect", () => {
        console.log("Connected to socket server");
        socket.emit("joinRoom", {
          boardId: boardIdNumber,
          username : "user1"
        });
      });
      socket.on("cardAdded", refetchCards);
      socket.on("cardDeleted", refetchCards);
      socket.on("cardUpdated", refetchCards);
      socket.on("cardPositionsUpdated", refetchCards);
    
      socket.on("columnAdded", refetchColumns);
      socket.on("columnDeleted", refetchColumns);
    
    
      return () => {
        socket.off("cardAdded", refetchCards);
        socket.off("cardDeleted", refetchCards);
        socket.off("cardUpdated", refetchCards);
        socket.off("cardPositionsUpdated", refetchCards);
        socket.off("columnAdded", refetchColumns);
        socket.off("columnDeleted", refetchColumns);
        socket.disconnect();
      };
    }, [boardIdNumber, queryClient]);
    
}