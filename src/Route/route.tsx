import { Route ,Routes } from "react-router-dom";
import BoardsPages from "../pages/Boards/Boards";
import { LoginTest } from "../pages/LoginPage/loginpage";
import { NewBoardPage } from "../pages/NewboardPage/CreateNewBoardPage";
import { ColmunsPage } from "../pages/ColmunsPage/ColmunsPage";

export const AppRoutes = () => {
    

   return(
    <Routes>
      <Route path="/" element={<BoardsPages />} />
      <Route path="/boards" element={<BoardsPages />} />
      <Route path="/login" element={<LoginTest />} />
      <Route path="/newboard" element={<NewBoardPage />} />
      <Route path="/boards/:boardId/columns" element={<ColmunsPage />} />
    </Routes>
   )
   
}