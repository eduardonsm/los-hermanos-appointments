import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBarberService } from "../services/barber/CreateBarberService";
import { DeleteBarberService } from "../services/barber/DeleteBarberService";
import { ListBarberService } from "../services/barber/ListBarberService";
import { AppointmentController } from "./AppointmentController";


class BarberController {
    async create(request: FastifyRequest, reply: FastifyReply){

        return { message: "created barber"}

    }

    async delete(request: FastifyRequest, reply: FastifyReply){

        return { message: "deleted barber"}

    }

    async list(request: FastifyRequest, reply: FastifyReply){

        return { message: "barbers list"}

    }
    async listAppointments(request: FastifyRequest, reply: FastifyReply){
        //o barberId vem da rota
        //vai chamar o appointment controller
        // const { barberId } = request.params as { barberId: string }
        // deve ser utlizado o service vindo dos agendamentos (pois é funcao de agendamentos)
        const appointmentController = new AppointmentController()
        // return appointmentController.listByBarber(request, reply)
        return { message: "barbers appointments list"}
    }
}

export { BarberController }