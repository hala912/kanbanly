import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../../Apis/api";
import type { BoardMember } from "../../types/Board_members";
export const useGetBoardMembers=(boardId: number | undefined) => {
 
    return useQuery<BoardMember[]>({
        queryKey: ["board_members", boardId],
        queryFn: async () => {
            const response = await apiFetch(`/boards/${boardId}/members`,
              {  method: "GET"}
            );
            return response;
        },
    
    })

}