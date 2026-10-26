import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";

export function useDeleteCard(boardId: number | undefined, columnId: number | undefined) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["cards", boardId, columnId],
        mutationFn: async (cardId: number) => {
            const response = await apiFetch(`/boards/${boardId}/columns/${columnId}/cards/${cardId}`, {
                method: "DELETE"
            });
            return response;
        },
        onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cards", boardId, columnId] });
            
        }
    })
}