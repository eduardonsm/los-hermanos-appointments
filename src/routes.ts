import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController  } from "./controllers/UserController";
import { BarberController } from "./controllers/BarberController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true };
    })

    // user routes
    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().create(request, reply);
    })

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().list(request, reply);   
     })

    fastify.delete("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().delete(request, reply);    
    })

    // barber routes
    fastify.post("/barber", async (request: FastifyRequest, reply: FastifyReply) => {
        return new BarberController().create(request, reply);
    })

    fastify.get("/barbers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new BarberController().list(request, reply);   
     })

    fastify.delete("/barber", async (request: FastifyRequest, reply: FastifyReply) => {
        return new BarberController().delete(request, reply);    
    })
    fastify.get("/barbers/:barberId/appointments", async (request: FastifyRequest, reply: FastifyReply) => {
        return new BarberController().listAppointments(request, reply);   
     })

}