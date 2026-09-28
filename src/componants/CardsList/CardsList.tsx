import { useAddCard } from "../../hooks/useCards/useAddCard";
import { useGetCards } from "../../hooks/useCards/useGetCards";

export const CardsList = ({ boardId, columnId }: { boardId: number | undefined; columnId: number | undefined }) => {
    const cards = useGetCards(boardId, columnId);
    const mutatedCards = useAddCard(boardId, columnId);

    const handleAddCard = () => {
        mutatedCards.mutate("New Card");
    }

    return(
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
            {cards.data?.map((card) => (
                <div key={card.id} className="bg-[#2C2B2B] rounded-lg border border-neutral-800 w-full p-3">
                    <h4 className="text-sm font-semibold text-neutral-200 mb-1 px-1">
                        {card.title}
                    </h4>
                    <p className="text-xs text-neutral-400 px-1">
                        {card.description}
                    </p>
                </div>
            ))}
            </div>
               <button className="w-full mt-2 text-sm text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 rounded px-2 py-1.5 text-left transition-colors"
            onClick={ 
                handleAddCard

            }>
              + Add a card
            </button>
        </div>
    )
}