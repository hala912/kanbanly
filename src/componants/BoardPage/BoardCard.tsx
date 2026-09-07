const BoardCard = () => {
  const members = [
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Alice Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Bob Johnson",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  return (
    <div className="bg-[#1C1B1B] rounded p-4 shadow-md border border-transparent hover:border-[#787776] shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-start justify-between mb-2">
        <h2 className="text-lg font-semibold text-neutral-100">Board Title</h2>
        <span className="text-sm text-neutral-400">
          whatever from the board
        </span>
      </div>

 <div className="border-t border-neutral-800 my-3" />


      <div className="flex items-start justify-between gap-2 mt-4">
        <div className="flex items-center -space-x-2">
        {members.slice(0, 2).map((member, index) => (
          <img
            key={index}
            src={member.avatar}
            alt={member.name}
            className="w-8 h-8 rounded-full border-2 border-neutral-800 "
          />
        ))}
        {members.length > 2 && (
          <span className="w-8 h-8 flex items-center justify-center text-xs text-neutral-400 bg-neutral-800 rounded-full px-1 py-0.5">
            +{members.length - 2}
          </span>
        )}
        </div>
        
          <span className="text-sm text-neutral-400">last updated 2h ago </span>
    
      </div>
    </div>
  );
};

export default BoardCard;
