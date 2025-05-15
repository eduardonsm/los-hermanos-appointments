import prismaClient from "../../prisma/index";

interface CreateUserProps{
    name: string;
    email: string;
    password: string;
    phone: string;
}

class CreateUserService{

    async execute({name, email, password, phone}: CreateUserProps){
        
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                phone: phone,
                password: password,
                status: true
            }
        })

        return user;

    }
}

export {CreateUserService}