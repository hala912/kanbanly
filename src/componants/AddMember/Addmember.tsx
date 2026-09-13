import { useState } from "react";
import { useAddNewMember } from "../../hooks/useAddnewmember";

export const AddMember = ({boardId}: {boardId: number}) => {


  const [memberEmail, setMemberEmail] = useState("");
  const membermutation = useAddNewMember(boardId);

  const handleAddMember = () => {
    membermutation.mutate(memberEmail);
    setMemberEmail("");
  };
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
      <div className="bg-[#1C1B1B] rounded p-4 shadow-md border border-transparent hover:border-[#787776] shadow-lg transition-shadow duration-300">
        <div className="flex flex-col items-start justify-between mb-2 text-neutral-100">
          <h2 className="text-lg font-medium">Add Members</h2>
          <p className="text-sm text-neutral-400">
            Add members to your board by entering their email addresses.
          </p>
        </div>
        <label className="text-xs uppercase tracking-wide text-neutral-400">
          Add members
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            placeholder="name@company.com"
            className="flex-1 p-2 border border-neutral-600 rounded text-neutral-100 bg-[#0A0A0A] placeholder-neutral-500"
          />
          <button
            type="button"
            className="bg-neutral-700 text-neutral-100 px-3 py-2 rounded hover:bg-neutral-600 transition-colors duration-300"
            onClick={handleAddMember}
          >
            + Add
          </button>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 bg-neutral-800 text-neutral-100 text-sm px-2 py-1 rounded-full">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-[10px]">
                AK
              </span>
              alex.k@sprintflow.io
              <button
                type="button"
                className="text-neutral-400 hover:text-neutral-200"
              >
                ×
              </button>
            </span>
            <span className="flex items-center gap-1 bg-neutral-800 text-neutral-100 text-sm px-2 py-1 rounded-full">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-pink-500 text-[10px]">
                ML
              </span>
              maya.lin@sprintflow.io
              <button
                type="button"
                className="text-neutral-400 hover:text-neutral-200"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
