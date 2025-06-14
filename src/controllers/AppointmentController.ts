import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAppointmentService } from "../services/appointment/CreateAppointmentService";
import { DeleteAppointmentService } from "../services/appointment/DeleteAppointmentService";
import { ListAppointmentService } from "../services/appointment/ListAppointmentService";
import { ListByBarberService } from "../services/appointment/ListByBarberService";


class AppointmentController {

    async create(request: FastifyRequest, reply: FastifyReply){

        const createAppointmentService = new CreateAppointmentService();
        const { userId, barberId, date, services } = request.body as {
            userId: number,
            barberId: number,
            date: Date,
            services: number[]
        };
        const appointment = await createAppointmentService.execute({ userId, barberId, date, services });
        return reply.send(appointment);
    }

    async delete(request: FastifyRequest, reply: FastifyReply){

        const deleteAppointmentService = new DeleteAppointmentService();
        const { id } = request.query as { id: string };
        const appointmentId = Number(id);
        if (isNaN(appointmentId)) {
            return reply.status(400).send({ error: "Invalid appointment ID" });
        }
        await deleteAppointmentService.execute(appointmentId);
        return reply.status(204).send();

    }

    async list(request: FastifyRequest, reply: FastifyReply){
        const listAppointmentService = new ListAppointmentService();
        const appointments = await listAppointmentService.execute();
        return reply.send(appointments);

    }
    async listByBarber(request: FastifyRequest, reply: FastifyReply){
        
        const listByBarberService = new ListByBarberService();
        const { barberId } = request.params as { barberId: string };
        const numericBarberId = Number(barberId);
        if (isNaN(numericBarberId)) {
            return reply.status(400).send({ error: "Invalid Barber ID" });
        }
        const appointments = await listByBarberService.execute({ barberId: numericBarberId });
        return reply.send(appointments);
    }

}

export { AppointmentController }