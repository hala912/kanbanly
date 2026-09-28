import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";

export function useAddCard(boardId?: number, columnId?: number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["cards", boardId, columnId],
        mutationFn: async (cardTitle: string) => {
            const response = await apiFetch(`/boards/${boardId}/columns/${columnId}/cards`, {
                method: "POST",
                body: JSON.stringify({ title: cardTitle }),
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cards", boardId, columnId] });
        }
    })
}