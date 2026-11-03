import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../../Apis/api";
import type { BoardMember } from "../../types/Board_members";
export const  useGetBoardMembers=() => {
 
    return useQuery<BoardMember[]>({
        queryKey: ["board_members"],
        queryFn: async () => {
            const response = await apiFetch(`/boards/:boardId/members`,
              {  method: "GET"}
            );
            return response;
        },
    
    })

}