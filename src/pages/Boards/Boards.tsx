import BoardCard from "../../componants/BoardPage/BoardCard";

const BoardsPages = () => {
  /* const boards = useBoards()
    const [newBoardName, setNewBoardName] = useState("")
    
    const { mutate } = useCreateNewBoard()
    const handleCreateBoard = () => {
        mutate(newBoardName)
        setNewBoardName("")
      console.log("Creating board with name:", newBoardName)

    }   */

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] px-8 py-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, #1C1B1B 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="flex item-start justify-between">
        <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-neutral-100">My boards</h1>
        <p className="mt-1 text-sm text-neutral-300">
          Boards you own or belong to.
        </p>
      </div>

        <div className="mt-8 flex gap-3">
          <input
            type="text"
            placeholder="Search boards..."
            className="w-64 border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
          />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <BoardCard />
      </div>
    </div>
  );
};

export default BoardsPages;
