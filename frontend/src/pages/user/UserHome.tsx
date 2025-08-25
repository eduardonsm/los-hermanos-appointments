import { Link } from "react-router-dom";

export default function UserHome() {
  
  return (
    <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-xl">Welcome to the Los Hermanos Appointment</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          
          <Link
            to="/barbers"
            className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            VER BARBEIROS CADASTRADOS
          </Link>
          <Link
            to="/users"
            className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            VER USUARIOS CADASTRADOS
          </Link>
        </div>
      </main>
    </div>
  );
}
