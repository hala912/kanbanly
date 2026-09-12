import { LayoutDashboard, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCreateNewBoard } from "../../hooks/CreateNewBoard";
const Sidebar = () => {
  const icons = [
    { name: "Boards", icon: LayoutDashboard, path: "/" },
    { name: "Templates", icon: Settings, path: "/templates" },
    { name: "Profile", icon: User, path: "/team" },
  ];

 
 const mutation = useCreateNewBoard();

  const handleCreateNewBoard = () => {
   
    mutation.mutate("New Board");
  }
  return (
    <div className="w-64 bg-[#1C1B1B] px-4 py-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-neutral-100">Kanbanly</h2>
        <p className="text-sm text-neutral-300">Boards you own or belong to.</p>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        {icons.map((icon) => (
          <NavLink
            key={icon.name}
            to={icon.path}
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 px-4 rounded ${isActive ? "bg-blue-500 text-white" : "text-neutral-300 hover:bg-[#313030] hover:text-white"}`
            }
          >
            <icon.icon size={18} />
            <span className="text-sm">{icon.name}</span>
          </NavLink>
        ))}
      </div>

      <button className="mt-8 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600" 
      onClick={handleCreateNewBoard}>
        Create New Board
      </button>
    </div>
  );
};

export default Sidebar;
