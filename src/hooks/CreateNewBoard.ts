import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../Apis/api"

/**
 * A custom hook for creating a new board.
 * @returns The mutation object for creating a new board.
 */
export function useCreateNewBoard() {

    const queryClient = useQueryClient();
    return useMutation({

        mutationFn: (boardName: string) => {
            return apiFetch("/boards", { 
                method: "POST",
                body: JSON.stringify({ name: boardName })
            }); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boards"] });
        }
    });

}

    