import { Route ,Routes } from "react-router-dom";
import BoardsPages from "../pages/Boards/Boards";
import { LoginTest } from "../pages/LoginPage/loginpage";
import { NewBoardPage } from "../pages/NewboardPage/CreateNewBoardPage";
import SignUp from "../pages/SignupPage/Signuppage";
import { EachBoardPage } from "../pages/EachBoardPage/EachBoardPage";

export const AppRoutes = () => {
    

   return(
    <Routes>
      <Route path="/" element={<BoardsPages />} />
      <Route path="/boards" element={<BoardsPages />} />
      <Route path="/login" element={<LoginTest />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/newboard" element={<NewBoardPage />} />
      <Route path="/boards/:boardId/columns" element={<EachBoardPage />} />
    </Routes>
   )
   
}