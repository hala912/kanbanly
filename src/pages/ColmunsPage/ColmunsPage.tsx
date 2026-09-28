import { useParams } from "react-router-dom";
import { useGetColumns } from "../../hooks/useColumns/useGetColmuns";
import { useAddColumns } from "../../hooks/useColumns/useAddColmuns";
import { useGetBoards } from "../../hooks/useGetBoards";
import { useState } from "react";
import { CardsList } from "../../componants/CardsList/CardsList";


export const ColmunsPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const boardIdNumber = boardId ? Number(boardId) : undefined;
  const colmuns = useGetColumns(boardIdNumber);
  const mutatedColumns = useAddColumns(boardIdNumber);

  //to add the board name to the page, we can use the useGetBoard hook to get the board name by id and display it in the page
  const boards = useGetBoards();
  const currentBoard = boards.data?.find((board) => board.id === boardIdNumber);

  const [isAddingColumn, setIsAddingColumn] = useState(false);

  // State to hold the new column title
  const [columnTitle, setColumnTitle] = useState("");
  const addColumn = () => {
    mutatedColumns.mutate(columnTitle);
    setColumnTitle("");
  };

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] px-8 py-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, #1C1B1B 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <h2 className="text-2xl font-bold text-neutral-100 mb-4">
        {currentBoard?.name}
      </h2>

      <div className="flex gap-4 items-start overflow-x-auto">
        {colmuns.data?.map((column) => (
          <div
            key={column.id}
            className="bg-[#1C1B1B] rounded-lg border border-neutral-800 w-72 shrink-0 p-3"
          >
            <h3 className="text-sm font-semibold text-neutral-200 mb-3 px-1">
              {column.title}
            </h3>

              {/** Add the CardsList component here to display the cards for each column */}
            <div className="flex flex-col gap-2">
             <CardsList boardId={boardIdNumber} columnId={column.id} />
            </div>

          </div>
        ))}
        {!isAddingColumn && (
          <button
            onClick={() => {
              setColumnTitle("");
              setIsAddingColumn(true);
            }}
            className="w-72 shrink-0 h-12 rounded-lg border border-dashed border-neutral-700 text-neutral-500 hover:text-neutral-300 hover:border-neutral-500 text-sm transition-colors"
          >
            + Add Column
          </button>
        )}
        {isAddingColumn && (
          <div className="flex flex-col gap-2 rounded-lg border">
            <input
              type="text"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              placeholder="New Column Title"
              className="w-72 shrink-0 h-12 rounded-lg border border-neutral-700 text-neutral-500 bg-[#1C1B1B] placeholder-neutral-500 px-2 py-1.5"
            />
            <div className="flex flex-row justify-start gap-2">
              <button
                onClick={addColumn}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Add
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                onClick={() => {
                  setIsAddingColumn(false);
                  setColumnTitle("");
                }}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
