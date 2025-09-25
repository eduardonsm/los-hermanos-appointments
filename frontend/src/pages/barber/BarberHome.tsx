import { Link } from "react-router-dom";

export default function BarberHome() {
  

  return (
    <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-xl">Welcome to the Los Hermanos Appointment</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          
          <div className="flex flex-col gap-3 p-10  bg-amber-200 rounded-2xl m-10">
            <h1 className="text-xl text-center text-gray font-medium">What do you want to do today?</h1>
            <Link className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            to="/barber/appointments" >My Appointments</Link>
            <Link className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            to="/" >My Services</Link>
            <Link className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            to="/" >Associate Services</Link>
            
          </div>
        </div>
      </main>
    </div>
  );
}
