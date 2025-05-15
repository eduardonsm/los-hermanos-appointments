import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAppointmentService } from "../services/appointment/CreateAppointmentService";
import { DeleteAppointmentService } from "../services/appointment/DeleteAppointmentService";
import { ListAppointmentService } from "../services/appointment/ListAppointmentService";
import { ListByBarberService } from "../services/appointment/ListByBarberService";


class AppointmentController {

    async create(request: FastifyRequest, reply: FastifyReply){

        return { message: "created Appointment"}

    }

    async delete(request: FastifyRequest, reply: FastifyReply){

        return { message: "deleted Appointment"}

    }

    async list(request: FastifyRequest, reply: FastifyReply){

        return { message: "Appointments list"}

    }
    async listByBarber(request: FastifyRequest, reply: FastifyReply){
        //o barberId vem da rota
        
        return { message: "barbers appointments list"}
    }

}

export { AppointmentController }