import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Card } from "../../types/Cards";
import { apiFetch } from "../../Apis/api";

export function useUpdateCardsPosition(
  boardId: number | undefined,
  columnId: number | undefined,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCardsPosition", boardId, columnId],
    mutationFn: async (newCards: Card[]) => {
      const response = await apiFetch(
        `/boards/${boardId}/columns/${columnId}/cards`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardids: newCards.map((card) => card.id) }),
        },
      );
      return response
    },
    onSuccess: () => {
      // Invalidate the query to refetch the updated cards
      queryClient.invalidateQueries({ queryKey: ["cards", boardId, columnId] });
    },
  });
}
