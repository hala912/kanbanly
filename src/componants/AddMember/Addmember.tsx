import { useState } from "react";
import { useAddNewMember } from "../../hooks/useBoard_members/useAddnewmember";
import { useGetBoardMembers } from "../../hooks/useBoard_members/useGetboard_members";
import type { OnlineUser } from "../../types/onlineUser";

export const AddMember = ({
  boardId,
  onlineMembers,
  onClose,
}: {
  boardId: number | undefined;
  onlineMembers: OnlineUser[];
  onClose: () => void;
}) => {
  const members = useGetBoardMembers(boardId);
  const [memberEmail, setMemberEmail] = useState("");
  const membermutation = useAddNewMember(boardId);

  const handleAddMember = () => {
    membermutation.mutate(memberEmail, {
      onSuccess: () => {
        setMemberEmail("");
        onClose();
      },
    });
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
          <button
            type="button"
            className="bg-neutral-700 text-neutral-100 px-3 py-2 rounded hover:bg-neutral-600 transition-colors duration-300"
            onClick={onClose}
          >
            Cancel
          </button>

          {membermutation.isError && (
            <p className="text-red-500 text-sm mt-2">
              Error adding member:{" "}
              {membermutation.error instanceof Error
                ? membermutation.error.message
                : "Unknown error"}
            </p>
          )}
          {membermutation.isSuccess && (
            <p className="text-green-500 text-sm mt-2">
              Member added successfully!
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {members.data?.map((member) => (
            <div key={member.id} className="flex items-center gap-2">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-neutral-800"
              />
              <div className="flex flex-row justify-end gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block ${
                    onlineMembers.some((o) => o.username === member.email)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-neutral-400">{member.email}</span>
                <span className="text-sm text-neutral-400">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
