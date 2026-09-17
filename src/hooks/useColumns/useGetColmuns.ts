import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";

export function useGetColumns(boardId: number) {
    return useQuery({
        queryKey: ["columns", boardId], 
        queryFn: async () => {
        const response = await apiFetch(`/boards/${boardId}/columns`, {
            method: "GET"
        });
        return response;
        },
       enabled: !!boardId
    })


}