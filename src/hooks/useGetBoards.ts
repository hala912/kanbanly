import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "../Apis/api"


export const  useGetBoards=() => {
 
    return useQuery({
        queryKey: ["boards"],
        queryFn: async () => {
            const response = await apiFetch(`/boards`,
              {  method: "GET"}
            );
            return response;
        },
    
    })

}