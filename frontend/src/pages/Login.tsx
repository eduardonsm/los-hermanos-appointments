import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // evita o reload da página
    alert(`Email: ${email}\nSenha: ${senha}`);
    api.post('/login',{
      email: email,
      password: senha
    })
  }
  const [mensagem, setMensagem] = useState("");

  async function handleLogout(e: React.FormEvent) {
  e.preventDefault();
  try {
    const response = await api.delete('/logout');
    console.log("Logout response:", response);
    if (response.status === 200 || response.status === 204) {
      setMensagem("Logout realizado com sucesso! ✅");
    } else {
      setMensagem(`Algo estranho: status ${response.status}`);
    }
  } catch (error: any) {
    console.error("Erro no logout:", error);
    setMensagem("Erro ao fazer logout ❌");
  }
}

  return (
    <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-xl">Welcome to the Los Hermanos Appointment</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          <h1>Here is login</h1>
          <Link
            to="/register"
            className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            Register
          </Link>
          <h1 className="text-4xl text-white font-medium">Clientes</h1>

          <form
            className="flex flex-col gap-4 my-6"
            onSubmit={handleSubmit}
          >
            <label className="text-white font-medium">Email:</label>
            <input
              type="email"
              placeholder="Digite seu email..."
              className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-white font-medium">Password:</label>
            <input
              type="password"
              placeholder="Digite seu password..."
              className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <input
              type="submit"
              value="Login"
              className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            />
          </form>
          <button type="submit" onClick={handleLogout}> LOGOUT</button>
          {mensagem && <p className="text-xl bg-green-600 mt-4">{mensagem}</p>}
          <Link
            to="/homeuser"
            className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            Home User
          </Link>
        </div>
      </main>
    </div>
  );
}
