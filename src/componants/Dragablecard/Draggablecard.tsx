import type { Card } from "../../types/Cards";
import { useSortable } from "@dnd-kit/sortable";

export const DraggableCard = ({
  card,
  onDelete,
}: {
  card: Card;
  onDelete: (cardId: number) => void;
}) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: card.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };


  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#2C2B2B] rounded-lg border border-neutral-800 w-full p-3"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-neutral-200 mb-1 px-1">
          {card.title}
        </h4>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-neutral-500 hover:text-neutral-300 px-1"
          title="Drag to reorder"
        >
          ⠿
        </div>
      </div>

      <p className="text-xs text-neutral-400 px-1">{card.description}</p>
      <button
        className="text-xs text-red-500 hover:text-red-700 mt-2 px-1"
        //{ onPointerDown={(e) => e.stopPropagation()}} this is the easiest way to delete but it may cause issues with drag and drop, so we will use the onDelete function instead
        onClick={() => {
          onDelete(card.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
