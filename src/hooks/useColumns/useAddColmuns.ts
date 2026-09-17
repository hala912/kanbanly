import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";

export function useAddColumns(boardId: number) {

    const usequeryClient = useQueryClient();
    return useMutation(
        {
        
        mutationFn: async (title: string) => {
                const response = await apiFetch(`/boards/${boardId}/columns`,{
                    method: "POST",
                    body: JSON.stringify({ title })
                });
                return response;
                },
                onSuccess: () => {
                    usequeryClient.invalidateQueries({ queryKey: ["columns", boardId] });
                }

        }
    )

}