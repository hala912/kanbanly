import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "../Apis/api"
import type { Board } from "../types/Board";


export const  useGetBoards=() => {
 
    return useQuery<Board[]>({
        queryKey: ["boards"],
        queryFn: async () => {
            const response = await apiFetch(`/boards`,
              {  method: "GET"}
            );
            return response;
        },
    
    })

}