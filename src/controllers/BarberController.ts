import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBarberService } from "../services/barber/CreateBarberService";
import { ListBarberService } from "../services/barber/ListBarberService";
import { DeleteBarberService } from "../services/barber/DeleteBarberService";
import { AssociateServicesBarberService } from "../services/barber/AssociateServicesBarberService";
import { ListServicesBarberService } from "../services/barber/ListServicesBarberService";
import { AppointmentController } from "./AppointmentController";


class BarberController {
    async create(request: FastifyRequest, reply: FastifyReply){

        const createBarberService = new CreateBarberService();

        const { name, password, email, phone } = request.body as {
            name: string;
            password: string;
            email: string;
            phone: string;
        };

        const barber = await createBarberService.execute({ name, email, phone, password });
        return barber;

    }

    async delete(request: FastifyRequest, reply: FastifyReply){

        const deleteBarberService = new DeleteBarberService();
        const { id } = request.query as { id: string };
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return reply.status(400).send({ error: "Invalid ID" });
        }

        const barber = await deleteBarberService.execute({id: numericId});
        return reply.send(barber);
    }

    async list(request: FastifyRequest, reply: FastifyReply){

        const listBarberService = new ListBarberService();
        const barbers = await listBarberService.execute();
        return reply.send(barbers);

    }
    async listServices(request: FastifyRequest, reply: FastifyReply){

        const listServicesBarberService = new ListServicesBarberService();
        const { barberId } = request.params as { barberId: string };
        const numericBarberId = Number(barberId);
        if (isNaN(numericBarberId)) {
            return reply.status(400).send({ error: "Invalid Barber ID" });
        }
        const services = await listServicesBarberService.execute({ barberId: numericBarberId });
        return reply.send(services);

    }
    async associateServices(request: FastifyRequest, reply: FastifyReply){

        const associateServicesBarberService = new AssociateServicesBarberService();
        const { barberId } = request.params as { barberId: string };
        const { servicesIds } = request.body as { servicesIds: number[] };
        const numericBarberId = Number(barberId);
        if (isNaN(numericBarberId)) {
            return reply.status(400).send({ error: "Invalid Barber ID" });
        }
        if (!Array.isArray(servicesIds) || servicesIds.length === 0) {
            return reply.status(400).send({ error: "Services IDs must be an array with at least one ID" });
        }
        const services = await associateServicesBarberService.execute({
            barberId: numericBarberId,
            servicesIds
        });
        return reply.send(services);
    }

    async listAppointments(request: FastifyRequest, reply: FastifyReply){
        const appointmentController = new AppointmentController()
        return appointmentController.listByBarber(request, reply)
    }
}

export { BarberController }