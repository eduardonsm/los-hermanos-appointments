import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController  } from "./controllers/UserController";
import { BarberController } from "./controllers/BarberController";

const userController = new UserController();
const barberController = new BarberController();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true };
    })

    // user routes
    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.create(request, reply);
    })

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.list(request, reply);   
     })

    fastify.delete("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.delete(request, reply);    
    })

    // barber routes
    fastify.post("/barber", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.create(request, reply);
    })

    fastify.get("/barbers", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.list(request, reply);   
     })

    fastify.delete("/barber", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.delete(request, reply);    
    })
    fastify.get("/barbers/:barberId/appointments", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.listAppointments(request, reply);   
     })

}