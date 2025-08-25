import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // evita o reload da página
    alert(`Email: ${email}\nSenha: ${senha}`);
    const response = await api.post('/login',{
      email: email,
      password: senha
    })
    if (response.status === 200 || response.status === 204) {
      console.log("deu certo")
      const myrole = await api.get("/me", { withCredentials: true });
      console.log("role:", myrole.data.role);
    }

    
  }
  const [mensagem, setMensagem] = useState("");

  async function handleLogout(e: React.FormEvent) {
  e.preventDefault();
  try {
    const response = await api.delete('/logout');
    console.log("Logout response:", response);
  
    if (response.status === 200 || response.status === 204) {
      setMensagem("Logout realizado com sucesso! ✅ ");
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
      <main className="my-10 w-full items-center justify-center md:max-w-2xl">
        <h1 className="text-2xl text-center">Welcome to the Login Los Hermanos Appointment</h1>
        <div className="flex flex-row md:flex-row items-center justify-center mt-10">
          <form
            className="flex flex-col gap-3 my-6 bg-amber-200 rounded-2xl p-10"    
            onSubmit={handleSubmit}
          >
            <label className="text-gray font-medium">Email:</label>
            <input
              type="email"
              placeholder="Digite seu email..."
              className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-gray font-medium">Password:</label>
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
            <div 
            className="flex flex-col gap-3 p-10  bg-amber-200 rounded-2xl m-10"
            >
              <h1 className="text-xl text-center text-gray font-medium">Ainda não tem conta?</h1>
              <h1 className="text-xl text-center text-amber-600">Cadastre-se</h1>
              <Link
                to="/user/register"
                className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
                >
                Sou Cliente, quero me cadastrar
              </Link>
              <Link
                to="/barber/register"
                className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
                >
                Sou barbeiro, quero me cadastrar
              </Link>
            </div>
            
          
          {mensagem && <p className="text-xl bg-green-600 mt-4">{mensagem}</p>}
        </div>
      </main>
    </div>
  );
}
