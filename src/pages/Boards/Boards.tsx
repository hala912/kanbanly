import { useState } from "react"
import { useBoards } from "../../hooks/GetBoards"
import { useCreateNewBoard } from "../../hooks/CreateNewBoard"

const BoardsPages = () => {

   
    const boards = useBoards()
    const [newBoardName, setNewBoardName] = useState("")
    
    const { mutate } = useCreateNewBoard()
    const handleCreateBoard = () => {
        mutate(newBoardName)
        setNewBoardName("")
      console.log("Creating board with name:", newBoardName)

    }   

   return (
        <div className="min-h-screen bg-neutral-50 px-8 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-2xl font-semibold text-neutral-900">My boards</h1>
                <p className="mt-1 text-sm text-neutral-500">Boards you own or belong to.</p>

                <div className="mt-8 flex gap-3">
                    <input
                        type="text"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        placeholder="Board name"
                        className="w-64 border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-500"
                    />
                    <button
                        onClick={() => handleCreateBoard()}
                        className="bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
                    >
                        Create board
                    </button>
                </div>

                <h1 className="mt-8 text-lg font-semibold text-neutral-900">Your boards</h1>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {boards.data?.map((board) => (
                        <div
                            key={board.id}
                            className="border border-neutral-200 bg-white p-4"
                        >
                            <h2 className="text-sm font-medium text-neutral-900">{board.name}</h2>
                        </div>
                    ))}
                </div> 

                {boards.data?.length === 0 && (
                    <p className="mt-8 text-sm text-neutral-400">No boards yet — create one above.</p>
                )}
            </div>
        </div>
    )
}

export default BoardsPages