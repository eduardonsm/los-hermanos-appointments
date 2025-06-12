import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController  } from "./controllers/UserController";
import { BarberController } from "./controllers/BarberController";
import { AppointmentController } from "./controllers/AppointmentController";
import { ServiceController } from "./controllers/ServiceController";

const userController = new UserController();
const barberController = new BarberController();
const appointmentController = new AppointmentController();
const serviceController = new ServiceController();

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
    fastify.get("/barbers/:barberId/services", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.listServices(request, reply);   
     })
    fastify.post("/barbers/:barberId/associate-services", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.associateServices(request, reply);   
     })
    fastify.get("/barbers/:barberId/appointments", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.listAppointments(request, reply);   
     })
     // services routes
     fastify.post("/service", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.create(request, reply);
     })
     fastify.get("/services", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.list(request, reply);
     })
     fastify.delete("/service", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.delete(request, reply);
     })
     fastify.patch("/service", async (request: FastifyRequest, reply: FastifyReply) => {
            return serviceController.update(request, reply);
     })
     // appointments routes
    fastify.post("/appointment", async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.create(request, reply);
    })
    fastify.get("/appointments", async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.list(request, reply);
    })
    fastify.delete("/appointment", async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.delete(request, reply);    
    })

}