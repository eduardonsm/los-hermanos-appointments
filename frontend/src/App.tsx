import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeUser from "./pages/user/HomeUser";
import UserView from "./pages/user/UserView";
import MainLayout from "./layouts/Mainlayout";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homeuser" element={<HomeUser />} />
          <Route path="/users" element={<UserView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
