import { useParams } from "react-router-dom";
import { useGetColumns } from "../../hooks/useColumns/useGetColmuns";
import { useGetBoards } from "../../hooks/useBoards/useGetBoards";
import { CardsList } from "../../componants/CardsList/CardsList";
import { DndContext } from "@dnd-kit/core";
import { DroppableColumn } from "../../componants/DroppableColmun/DroppableColumn";
import { useDeleteColumns } from "../../hooks/useColumns/useDeleteColmuns";
import { useSocket } from "../../hooks/useSocket";
import { AddColumnForm } from "../../componants/AddcolmunForm/AddColmunForm";
import { AddMember } from "../../componants/AddMember/Addmember";

export const EachBoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const boardIdNumber = boardId ? Number(boardId) : undefined;
  const colmuns = useGetColumns(boardIdNumber);
  const deleteColumnMutation = useDeleteColumns(boardIdNumber);

  useSocket(boardIdNumber); // Use the custom hook to establish a socket connection

  //to add the board name to the page, we can use the useGetBoard hook to get the board name by id and display it in the page
  const boards = useGetBoards();
  const currentBoard = boards.data?.find((board) => board.id === boardIdNumber);

  const handleDeleteColumn = (columnId: number) => {
    deleteColumnMutation.mutate(columnId);
    console.log(`Delete column with ID: ${columnId}`);
  };

  
  return (
    <DndContext>
      <div
        className="min-h-screen bg-[#0A0A0A] px-8 py-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1C1B1B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">
            {currentBoard?.name}
          </h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={ ()=> {
            // Handle add member action
          }}
          >
            Add Member
          </button>
        </div>

        <div className="flex gap-4 items-start overflow-x-auto">
          {colmuns.data?.map((column) => (
            <DroppableColumn
              key={column.id}
              column={column}
              onDelete={() => handleDeleteColumn(column.id)}
            >
              <div className="flex flex-col gap-2 ">
                <CardsList boardId={boardIdNumber} columnId={column.id} />
              </div>
            </DroppableColumn>
          ))}

          <AddColumnForm boardIdNumber={boardIdNumber} />
        </div>
      </div>
    </DndContext>
  );
};
