import { useState } from "react";
import { AddMember } from "../../componants/AddMember/Addmember"
import { CreateNewBoard } from "../../componants/NewBoardFrom/NewBoardForm"

export const NewBoardPage = () => {

  //AddMember doesn't exist at all until boardid has a real value 
  //so there's no window where it renders with a fake/missing id.
  const[boardid, setBoardId] = useState<number | null>();
return(
      <div
      className="min-h-screen bg-[#0A0A0A] px-8 py-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, #1C1B1B 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
        <CreateNewBoard onBoardCreated={(boardId) => setBoardId(boardId)} />
        {boardid && <AddMember boardId={boardid} />}    </div>
)

}