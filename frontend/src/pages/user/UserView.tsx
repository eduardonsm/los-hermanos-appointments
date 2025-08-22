import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

interface UserProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: boolean;
  created_at: string;
}
export default function UserView() {
    
    // const [users, setusers] = useState<UserProps[]>([])
    const users = [
        {id:"1",name:"junior",email:"junior@gmail.com",phone:"99034902",password:"senha123",status:true,created_at:"ontem"} as UserProps,
        {id:"2",name:"bianca",email:"janior@gmail.com",phone:"99345802",password:"senha4523",status:false,created_at:"hoje"} as UserProps,
    ]
    // useEffect(() => {loadUsers()},[])

    // async function loadUsers() {
    //     const response = await api.get('/users');
    //     setusers(await response.data);
    // }

  return (
    <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-xl">Welcome to the Los Hermanos Appointment</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          
          <h1>USUARIOS CADASTRADOS: </h1>
          <section className="flex flex-col gap-4">
          {users.map((user) => (
            <article key={user.id} className="w-full bg-white rouded-md p-2 relative hover:scale-105 transition-all duration-200">
              
              <p> <span className="font-medium">Nome:</span> {user.name}</p>
              <p> <span className="font-medium">Email:</span> {user.email}</p>
              <p> <span className="font-medium">phone:</span> {user.phone}</p>
              <p> <span className="font-medium">Status:</span> {user.status ? "ATIVO" : "DESATIVADO"} </p>
            </article>
          ))
          }
        </section>
          <Link
            to="/homeuser"
            className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            VOLTAR
          </Link>
        </div>
      </main>
    </div>
  );
}
