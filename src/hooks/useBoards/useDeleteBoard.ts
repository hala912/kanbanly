import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../Apis/api"

 export const useDeleteBoard = (boardId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiFetch(`/boards/${boardId}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
};