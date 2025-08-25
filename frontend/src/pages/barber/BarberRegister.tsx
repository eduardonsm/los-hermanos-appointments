import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

export default function BarberRegister() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post("/barber", {
        name: nome,
        email: email,
        password,
        phone
      });

      if (response.status === 200) {
        setMessage(`Cadastro com sucesso! Seja bem-vindo(a) ${response.data.name}`);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Erro ao cadastrar!");
    }
  }

  return (
    <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-xl">Welcome to the Los Hermanos Register</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          {!message && (
            <form className="flex flex-col gap-4 my-6"
            onSubmit={handleSubmit}>
            <label className=" text-gray font-medium"> Nome: </label>
            <input type="text"
            placeholder="Digite seu nome..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            />  
            <label className=" text-gray font-medium"> Telefone: </label>
            <input type="text"
            placeholder="Digite seu telefone..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />  
            <label className=" text-gray font-medium"> Email: </label>
            <input type="email"
            placeholder="Digite seu melhor email..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />  
            <label className=" text-gray font-medium"> password </label>
            <input type="password"
            placeholder="Digite seu password..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={password}
              onChange={(e) => setpassword(e.target.value)}
            />  
            
            <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
          </form>
          )}
          {message && <p className="text-2xl text-green-700">{message}</p>}
        </div>
      </main>
    </div>
  );
}
