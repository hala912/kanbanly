import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";

export function useDeleteCard(boardId: number | undefined, columnId: number | undefined) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (cardId: number) => {
            const response = await apiFetch(`/boards/${boardId}/columns/${columnId}/cards/${cardId}`, {
                method: "DELETE"
            });
            return response;
        },
        onSuccess: () => {
            // Invalidate the query to refetch the cards after deletion
            if (boardId !== undefined && columnId !== undefined) {
                queryClient.invalidateQueries({ queryKey: ["cards", boardId, columnId] });
            }
        }
    })
}