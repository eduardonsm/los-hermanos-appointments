// Header.tsx
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-amber-600 p-4 flex gap-6 text-white">
      <Link
        to="/homeuser"
        className={location.pathname === "/homeuser" ? "underline font-bold" : ""}
      >
        Home
      </Link>

      <Link
        to="/login"
        className={location.pathname === "/login" ? "underline font-bold" : ""}
      >
        Login
      </Link>

      <Link
        to="/users"
        className={location.pathname === "/users" ? "underline font-bold" : ""}
      >
        Usuários
      </Link>
    </header>
  );
}
