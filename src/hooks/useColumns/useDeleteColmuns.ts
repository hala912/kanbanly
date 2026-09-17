import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";

export function useDeleteColumns(boardId: number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (columnId: number) => {
            const response = await apiFetch(`/boards/${boardId}/columns/${columnId}`, {
                method: "DELETE",
            });
            return response;
            },
            onSuccess: () => {
                // Invalidate the query to refetch the columns after deletion
                queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
        }
    })
}