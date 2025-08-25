import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/user/UserRegister"; 
import BarberRegister from "./pages/barber/BarberRegister"; 
import HomeUser from "./pages/user/HomeUser";
import UserView from "./pages/user/UserView";
import MainLayout from "./layouts/Mainlayout";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/barber/register" element={<BarberRegister />} />
          <Route path="/homeuser" element={<HomeUser />} />
          <Route path="/users" element={<UserView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
