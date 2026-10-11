import { DndContext } from "@dnd-kit/core";
import { useAddCard } from "../../hooks/useCards/useAddCard";
import { useGetCards } from "../../hooks/useCards/useGetCards";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DraggableCard } from "../Dragablecard/Draggablecard";
import { useQueryClient } from "@tanstack/react-query";
import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useUpdateCardsPosition } from "../../hooks/useColumns/useUpdatecardsPostion";

export const CardsList = ({
  boardId,
  columnId,
}: {
  boardId: number | undefined;
  columnId: number | undefined;
}) => {
  const queryClient = useQueryClient();
  const cards = useGetCards(boardId, columnId);
  const mutatedCards = useAddCard(boardId, columnId);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  const updateCardsPosition = useUpdateCardsPosition(boardId, columnId);

  const handleAddCard = () => {
    mutatedCards.mutate(newCardTitle);
    setNewCardTitle("");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !cards.data) return;

    const oldIndex = cards.data?.findIndex((card) => card.id === active.id);
    const newIndex = cards.data?.findIndex((card) => card.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const previousCards = [...cards.data];
    const newCards = arrayMove(cards.data, oldIndex, newIndex);
    
    queryClient.setQueryData(["cards", boardId, columnId], newCards);

    updateCardsPosition.mutate(newCards, {
    onError: () => {
      queryClient.setQueryData(["cards", boardId, columnId], previousCards);
    },
  });

  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={cards.data?.map((card) => card.id) || []}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
            {cards.data?.map((card) => (
              <DraggableCard key={card.id} card={card} />
            ))}
          </div>
          {!isAddingCard && (
            <button
              className="w-full mt-2 text-sm text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 rounded px-2 py-1.5 text-left transition-colors"
              onClick={() => {
                setIsAddingCard(true);
              }}
            >
              + Add a card
            </button>
          )}
          {isAddingCard && (
            <div>
              <input
                type="text"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                className="w-full mt-2 text-sm text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 rounded px-2 py-1.5 text-left transition-colors"
                placeholder="Enter card title"
             />
            
              <div className="flex flex-row justify-start gap-2 mt-2">
                <button
                  onClick={() => {
                    handleAddCard();
                    setIsAddingCard(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Add
                </button>
                <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                 onClick={() => {
                    setIsAddingCard(false);
                    setNewCardTitle("");
                  }
                }
                >
                  cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};
