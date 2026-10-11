import type { Card } from "../../types/Cards"
import { useSortable } from "@dnd-kit/sortable";

export const DraggableCard=({card}:{ card:Card})=>{

    const {setNodeRef, attributes, listeners, transform, transition} = useSortable({
        id: card.id
    })
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
      };

    return(
         <div  ref={setNodeRef} {...attributes} {...listeners} style={style} 
         className="bg-[#2C2B2B] rounded-lg border border-neutral-800 w-full p-3" >
                    <h4 className="text-sm font-semibold text-neutral-200 mb-1 px-1">
                        {card.title}
                    </h4>
                    <p className="text-xs text-neutral-400 px-1">
                        {card.description}
                    </p>
                </div>
    )
}