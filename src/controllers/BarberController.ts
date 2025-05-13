import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBarberService } from "../services/barber/CreateBarberService";
import { DeleteBarberService } from "../services/barber/DeleteBarberService";
import { ListBarberService } from "../services/barber/ListBarberService";


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

}

export { BarberController }