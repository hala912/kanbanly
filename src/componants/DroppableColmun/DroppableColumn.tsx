import { useDroppable } from "@dnd-kit/core";
import type { Column } from "../../types/Colmuns";

export const DroppableColumn =({ column , children }: { column: Column; children: React.ReactNode }) => {


    const {setNodeRef} = useDroppable({
        id: `column-${column.id}`,
      });
 return (
    <div  ref={setNodeRef} className="bg-[#1C1B1B] rounded-lg border border-neutral-800 w-72 shrink-0 p-3">
      <h3 className="text-sm font-semibold text-neutral-200 mb-3 px-1">
        {column.title}
      </h3>
        {children}
    </div>
  );
}