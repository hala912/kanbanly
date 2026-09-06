import { Route ,Routes } from "react-router-dom";
import BoardsPages from "../pages/Boards/Boards";

export const AppRoutes = () => {
    

   return(
    <Routes>
      <Route path="/" element={<BoardsPages />} />
    </Routes>
   )
   
}