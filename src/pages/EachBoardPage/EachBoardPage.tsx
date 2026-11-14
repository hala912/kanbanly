import { useParams } from "react-router-dom";
import { useGetColumns } from "../../hooks/useColumns/useGetColmuns";
import { useGetBoards } from "../../hooks/useBoards/useGetBoards";
import { CardsList } from "../../componants/CardsList/CardsList";
import { DndContext } from "@dnd-kit/core";
import { DroppableColumn } from "../../componants/DroppableColmun/DroppableColumn";
import { useDeleteColumns } from "../../hooks/useColumns/useDeleteColmuns";
import { useSocket } from "../../hooks/useSocket";
import { AddColumnForm } from "../../componants/AddcolmunForm/AddColmunForm";
import { useState } from "react";
import { AddMember } from "../../componants/AddMember/Addmember";
import { useAuth } from "../../context/useAuth";
import { useDeleteBoard } from "../../hooks/useBoards/useDeleteBoard";

export const EachBoardPage = () => {
  const user = useAuth();
  const { boardId } = useParams<{ boardId: string }>();
  const boardIdNumber = boardId ? Number(boardId) : undefined;
  const colmuns = useGetColumns(boardIdNumber);
  const deleteColumnMutation = useDeleteColumns(boardIdNumber);
  const deleteBoardMutation = useDeleteBoard(boardIdNumber);
  const online = useSocket(boardIdNumber, user?.user?.email); // Use the custom hook to establish a socket connection
  console.log("Online members:", online); // Log the online members to the console

  //to add the board name to the page, we can use the useGetBoard hook to get the board name by id and display it in the page
  const boards = useGetBoards();
  const currentBoard = boards.data?.find((board) => board.id === boardIdNumber);

  const handleDeleteColumn = (columnId: number) => {
    deleteColumnMutation.mutate(columnId);
    //console.log(`Delete column with ID: ${columnId}`);
  };

  //const navigate = useNavigate();

  const handledeleteBoard = () => {
    deleteBoardMutation.mutate();
    console.log(`Delete board with ID: ${boardIdNumber}`);
    //navigate("/boards"); // Navigate to the boards page after successful deletion
  };

  const [isaddmemeberopen, setIsaddmemeberopen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              •••
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-64 rounded-lg border border-[#38414A] bg-[#282E33] py-2 text-[#B6C2CF] shadow-[0_8px_12px_#091E4226,0_0_1px_#091E424f]">
                <p className="px-3 pb-2 text-center text-sm font-semibold text-[#9FADBC]">
                  Board actions
                </p>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setIsaddmemeberopen(true);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/10"
                >
                  Add member
                </button>

                <div className="my-2 border-t border-[#38414A]" />

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handledeleteBoard();
                  }}
                  className="block w-full px-3 py-1.5 text-left text-sm text-[#F87168] transition-colors hover:bg-red-500/10"
                >
                  Delete board
                </button>
              </div>
            )}
          </div>

          {deleteBoardMutation.isError && (
            <p className="mt-3 rounded-[3px] border border-[#F87168]/40 bg-[#F87168]/10 px-3 py-2 text-sm text-[#F87168]">
              {deleteBoardMutation.error.message}
            </p>
          )}
          {deleteBoardMutation.isSuccess && (
            <p className="mt-3 rounded-[3px] border border-[#34D399]/40 bg-[#34D399]/10 px-3 py-2 text-sm text-[#34D399]">
              Board deleted successfully! 
            </p> 
          )}
        </div>
        {isaddmemeberopen && (
          <AddMember
            boardId={boardIdNumber}
            onlineMembers={online}
            onClose={() => setIsaddmemeberopen(false)}
          />
        )}

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
