import { useCreateNewBoard } from "../../hooks/useCreateNewBoard";

export const CreateNewBoard = ({ onBoardCreated }: { onBoardCreated: (boardId: number) => void }) => {
  const mutation = useCreateNewBoard();

  const handleCreateNewBoard = () => {
    mutation.mutate("", {
      onSuccess: (data) => {
        onBoardCreated(data.id);
      }
    });
  };


  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
      <div className="bg-[#1C1B1B] rounded p-4 shadow-md border border-transparent hover:border-[#787776] shadow-lg transition-shadow duration-300">
        <div className="flex flex-col items-start justify-between mb-2 text-neutral-100">
          <h2 className="text-lg font-medium">New Board</h2>
          <p className="text-sm text-neutral-400">
            Create a focused space for your team
          </p>
        </div>

        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateNewBoard();
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-wide text-neutral-400">
              Board name
            </label>
            <input
              type="text"
              placeholder="Q1 Product Roadmap & Sprint 50"
              className="p-2 border border-neutral-600 rounded text-neutral-100 bg-[#0A0A0A] placeholder-neutral-500"
            />
          </div>

        

          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              className="bg-neutral-700 text-neutral-100 px-4 py-2 rounded hover:bg-neutral-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={handleCreateNewBoard}
            >
              + Create board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
