import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";

export function useUpdateColumns(boardId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(title:string)=>{
            const response = await apiFetch(`/boards/${boardId}/columns`,{
                method:"PUT",
                body:JSON.stringify({title})
            });
            return response;
        },
        onSuccess:()=>{
            // Invalidate the query to refetch the columns after update
            queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
        }
    })
}