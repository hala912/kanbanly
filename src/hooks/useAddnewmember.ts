import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../Apis/api";

export function useAddNewMember(boardId: number) {
  const queryClient = useQueryClient();

  return useMutation(
    {
        mutationFn: async (memberEmail: string) => {
            const response = await apiFetch(`/boards/${boardId}/members`, {
                method: "POST",
                body: JSON.stringify({ email: memberEmail })
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
        }
    }
  )

}