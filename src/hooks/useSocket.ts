import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { OnlineUser } from "../types/onlineUser";

export const useSocket = (boardIdNumber: number | undefined , username: string | undefined ) => {

     const queryClient = useQueryClient()

     const [onlineMembers, setOnlineMembers] = useState<OnlineUser[]>([]);

    useEffect(() => {
      
      if (!boardIdNumber) return;
    
      const socket = io("http://localhost:3000");
    
      const refetchCards = () => {
        queryClient.invalidateQueries({ queryKey: ["cards", boardIdNumber] });
      };
    
      const refetchColumns = () => {
        queryClient.invalidateQueries({ queryKey: ["columns", boardIdNumber] });
      };
      const refetchBoard = () => {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
      };


      socket.on("connect", () => {
        console.log("Connected to socket server");
        socket.emit("joinRoom", {
          boardId: boardIdNumber,
          username : username
        });
      });
      socket.on("cardAdded", refetchCards);
      socket.on("cardDeleted", refetchCards);
      socket.on("cardUpdated", refetchCards);
      socket.on("cardPositionsUpdated", refetchCards);
    
      socket.on("columnAdded", refetchColumns);
      socket.on("columnDeleted", refetchColumns);
      socket.on("boardDeleted", refetchBoard);
      socket.on("listupdate", setOnlineMembers);

      return () => {
        socket.off("cardAdded", refetchCards);
        socket.off("cardDeleted", refetchCards);
        socket.off("cardUpdated", refetchCards);
        socket.off("cardPositionsUpdated", refetchCards);
        socket.off("columnAdded", refetchColumns);
        socket.off("columnDeleted", refetchColumns);
        socket.off("boardDeleted", refetchBoard);
        socket.off("listupdate", setOnlineMembers);
        
        socket.disconnect();
      };
     
    }, [boardIdNumber, username, queryClient]);
    
    return onlineMembers;
}