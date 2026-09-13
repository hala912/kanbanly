import { Route ,Routes } from "react-router-dom";
import BoardsPages from "../pages/Boards/Boards";
import { LoginTest } from "../pages/LoginPage/loginpage";
import { NewBoardPage } from "../pages/NewboardPage/CreateNewBoardPage";

export const AppRoutes = () => {
    

   return(
    <Routes>
      <Route path="/" element={<BoardsPages />} />
      <Route path="/login" element={<LoginTest />} />
      <Route path="/newboard" element={<NewBoardPage />} />
    </Routes>
   )
   
}