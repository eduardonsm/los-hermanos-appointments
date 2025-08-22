import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    // <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
    //   <main className="my-10 w-full md:max-w-2xl">
    //     <h1 className="text-xl">Welcome to the Los Hermanos Appointment</h1>
    //     <div className="flex flex-col md:flex-row items-center justify-center mt-10">
    //       <button className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-700">login</button>
    //       <button className="bg-amber-500 text-white py-2 px-4 rounded ml-2 hover:bg-amber-700"> register</button>
    //     </div>
    //   </main>
    // </div>
  );
}
