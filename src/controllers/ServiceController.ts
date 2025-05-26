import { FastifyReply, FastifyRequest } from "fastify";
import { CreateServiceService } from "../services/service/CreateServiceService";
import { DeleteServiceService } from "../services/service/DeleteServiceService";
import { ListServiceService } from "../services/service/ListServiceService";
import { UpdateServiceService } from "../services/service/UpdateServiceService";

class ServiceController {

    async create(request: FastifyRequest, reply: FastifyReply){
        const createServiceService = new CreateServiceService();

        const { name, price, duration } = request.body as {
            name: string;
            price: number;
            duration: number;
        };

        const service = await createServiceService.execute({ name, price, duration });
        return service;
    }

    async delete(request: FastifyRequest, reply: FastifyReply){
        const {id} = request.query as { id: string };
        const numericId = Number(id);
        if (isNaN(numericId)) {
        return reply.status(400).send({ error: "Invalid ID" });
        }
        const deleteServiceService = new DeleteServiceService();
        const service = await deleteServiceService.execute({id: numericId});
        return reply.send(service);

    }

    async list(request: FastifyRequest, reply: FastifyReply){

        const listServiceService = new ListServiceService();
        const services = await listServiceService.execute();
        return reply.send(services);

    }
    async update(request: FastifyRequest, reply: FastifyReply){

        const { id, name, price, duration } = request.body as {
            id: string;
            name?: string;
            price?: number;
            duration?: number;
        };
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return reply.status(400).send({ error: "Invalid ID" });
        }
        const updateServiceService = new UpdateServiceService();
        const service = await updateServiceService.execute({ id: numericId, name, price, duration });
        return reply.send(service);
    }

}

export { ServiceController }