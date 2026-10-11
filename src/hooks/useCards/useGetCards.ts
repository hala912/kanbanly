import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";
import type { Card } from "../../types/Cards";

export function useGetCards(boardId: number | undefined, columnId: number | undefined) {
    return useQuery<Card[]>(
        {
            queryKey:["cards" , boardId, columnId],
            queryFn: async () => {
                const response = await apiFetch(`/boards/${boardId}/columns/${columnId}/cards`, {
                    method: "GET"
                });
                return response;
            }
        }
    )
}