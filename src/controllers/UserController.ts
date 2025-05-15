import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../services/user/CreateUserService";
import { DeleteUserService } from "../services/user/DeleteUserService";
import { ListUserService } from "../services/user/ListUserService";


class UserController {

    async create(request: FastifyRequest, reply: FastifyReply){

        const {name, email, password, phone} = request.body as {
            name: string, 
            email: string,
            password: string, 
            phone: string
        };
        
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, password, phone});

        return user;

    }

    async delete(request: FastifyRequest, reply: FastifyReply){

        return { message: "deleted user"}

    }

    async list(request: FastifyRequest, reply: FastifyReply){

        return { message: "users list"}

    }

}

export { UserController }