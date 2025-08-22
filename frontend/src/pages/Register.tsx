import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";


export default function Register(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setPhone] = useState("");
  
    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault(); // evita o reload da página
      alert(`Email: ${email}\npassword: ${password} \n Nome:${nome}`);
      api.post('/user', {
        name: nome,
        email: email,
        password:password,
        phone: phone
      })
      const response = await api.get('/users');
      alert(response)
    }
  return (
<div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-xl">Welcome to the Los Hermanos Appointment</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          <h1>Here is login</h1>
          <Link to="/login" className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-700">login</Link>
          <h1 className="text-4xl text-white font-medium">Clientes</h1>
          <form className="flex flex-col gap-4 my-6"
          onSubmit={handleSubmit}>
            <label className=" text-white font-medium"> Nome: </label>
            <input type="text"
            placeholder="Digite seu nome..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            />  
            <label className=" text-white font-medium"> Telefone: </label>
            <input type="text"
            placeholder="Digite seu telefone..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />  
            <label className=" text-white font-medium"> Email: </label>
            <input type="email"
            placeholder="Digite seu melhor email..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />  
            <label className=" text-white font-medium"> password </label>
            <input type="password"
            placeholder="Digite seu password..." 
            className="w-full mb-5 p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={password}
              onChange={(e) => setpassword(e.target.value)}
            />  
            
            <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
          </form>
        </div>
      </main>
    </div>
  );
}
