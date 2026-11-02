import { useDroppable } from "@dnd-kit/core";
import type { Column } from "../../types/Colmuns";

export const DroppableColumn =
({ column , children, onDelete }: { column: Column; children: React.ReactNode , onDelete: (columnId: number) => void }) => {


    const {setNodeRef} = useDroppable({
        id: `column-${column.id}`,
      });
 return (
    <div  ref={setNodeRef} className="bg-[#1C1B1B] rounded-lg border border-neutral-800 w-72  p-3 filled-scrollbar shrink-0 h-fit">
     <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-semibold text-neutral-200 mb-3 px-1">
        {column.title}
      </h3>
      <button className="text-xs text-red-500 hover:text-red-700 mt-2 px-1"
        onClick={() => {
          onDelete(column.id);
        }}
      >
        Delete
      </button>
    </div>
        {children}
    </div>
  );
}