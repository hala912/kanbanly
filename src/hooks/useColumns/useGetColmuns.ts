import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api";
import type { Column } from "../../types/Colmuns";

export function useGetColumns(boardId?: number) {
    return useQuery<Column[]>({
        queryKey: ["columns", boardId], 
        queryFn: async () => {
        const response = await apiFetch(`/boards/${boardId}/columns`, {
            method: "GET"
        });
        return response;
        },
       enabled: !!boardId,
    })


}