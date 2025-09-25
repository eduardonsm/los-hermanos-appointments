import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/user/UserRegister"; 
import BarberRegister from "./pages/barber/BarberRegister"; 
import UserHome from "./pages/user/UserHome";
import BarberHome from "./pages/barber/BarberHome";
import BarberAppointments from "./pages/barber/BarberAppointments";
import UserView from "./pages/user/UserView";
import MainLayout from "./layouts/Mainlayout";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/barber/register" element={<BarberRegister />} />
          <Route path="/users" element={<UserView />} />
          <Route path="/barber/home" element={<BarberHome />} />
          <Route path="/barber/appointments" element={<BarberAppointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
