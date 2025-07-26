import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../services/user/CreateUserService";
import { DeleteUserService } from "../services/user/DeleteUserService";
import { ListUserService } from "../services/user/ListUserService";
import { GetUserByIdService } from "../services/user/GetUserByIdService";
import { UpdateUserService } from "../services/user/UpdateUserService";

class UserController {

    async create(request: FastifyRequest, reply: FastifyReply){
        const createUserService = new CreateUserService();
        const {name, email, password, phone} = request.body as {
            name: string, 
            email: string,
            password: string, 
            phone: string
        };
        
        const user = await createUserService.execute({name, email, password, phone});
        return user;

    }

    async delete(request: FastifyRequest, reply: FastifyReply){
        const {id} = request.query as { id: string };
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return reply.status(400).send({ error: "Invalid ID" });
        }
        const deleteUserService = new DeleteUserService();
        const user = await deleteUserService.execute({id: numericId});
        return reply.send(user);

    }

    async list(request: FastifyRequest, reply: FastifyReply){
        const listUserService = new ListUserService();
        const users = await listUserService.execute();
        return reply.send(users);
    }

    async getUserById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return reply.status(400).send({ error: "Invalid ID" });
        }
        const getUserById = new GetUserByIdService();
        const user = await getUserById.execute(numericId);
        if (!user) {
            return reply.status(404).send({ error: "User not found" });
        }
        return reply.send(user);
    }
    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return reply.status(400).send({ error: "Invalid ID format" });
        }

        const dataToUpdate = request.body as {
            name?: string;
            email?: string;
            phone?: string;
        };

        try {
            const updateUserService = new UpdateUserService();
            const updatedUser = await updateUserService.execute({
                id: numericId,
                data: dataToUpdate,
            });

            return reply.send(updatedUser);

        } catch (e) {
            console.error(e);
            return reply.status(500).send({ error: "Failed to update user" });
        }
    }
}

export { UserController }