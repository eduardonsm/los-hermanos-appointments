import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController  } from "./controllers/UserController";
import { BarberController } from "./controllers/BarberController";
import { AppointmentController } from "./controllers/AppointmentController";
import { ServiceController } from "./controllers/ServiceController";
import { AuthController } from "./controllers/AuthController";
import { authenticate } from "./middleware/auth";
import { authorize } from "./middleware/authorize";

const userController = new UserController();
const barberController = new BarberController();
const appointmentController = new AppointmentController();
const serviceController = new ServiceController();
const authController = new AuthController();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/test",{preHandler: [authenticate, authorize(['BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true };
    })
    //login
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return authController.login(request, reply);
    })
    fastify.delete("/logout",{preHandler: [authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return authController.logout(request, reply);
    })

    // user routes
    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.create(request, reply);
    })
    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.list(request, reply);   
     })

     //tem q ser user e ser o user a deletar, ver se tem isso
    fastify.delete("/user",{preHandler: [authenticate, authorize(['USER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.delete(request, reply);    
    })
    fastify.get("/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUserById(request, reply);
    })

    //tem q ser user e ser o user a dar update
    fastify.put("/user/:id",{preHandler: [authenticate, authorize(['USER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.update(request, reply);
    })
    // barber routes
    fastify.post("/barber", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.create(request, reply);
    })
    fastify.get("/barbers", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.list(request, reply);   
     })
     //tem que ser barber e ser o barber a deletar
    fastify.delete("/barber",{preHandler: [authenticate, authorize(['BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.delete(request, reply);    
    })
    fastify.get("/barber/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.getBarberById(request, reply);    
    })
    fastify.get("/barbers/:barberId/services", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.listServices(request, reply);   
     })
     //tem que ser barber e ser o barber a associar os servicos
    fastify.post("/barbers/:barberId/associate-services",{preHandler: [authenticate, authorize(['BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.associateServices(request, reply);   
     })
    fastify.get("/barbers/:barberId/appointments",{preHandler: [authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.listAppointments(request, reply);   
     })
    //tem que ser barber e ser o barber a dar update
    fastify.put("/barber/:id",{preHandler: [authenticate, authorize(['BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.update(request, reply);
    })
     // services routes

     // tem que ser barber
     fastify.post("/service", {preHandler: [authenticate, authorize(['BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.create(request, reply);
     })
     fastify.get("/services", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.list(request, reply);
     })
     fastify.get("/service/:id", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.getServiceById(request, reply);
     })
     // tem que ser barber
     fastify.delete("/service", {preHandler: [authenticate, authorize(['BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.delete(request, reply);
     })
     // tem que ser barber
     fastify.patch("/service", {preHandler: [authenticate, authorize(['BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
            return serviceController.update(request, reply);
     })
     // appointments routes

     // tem que ser user autenticado
    fastify.post("/appointment",{preHandler: [authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.create(request, reply);
    })
    fastify.get("/appointments", async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.list(request, reply);
    })
    fastify.get("/appointment/:id",{preHandler: [authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.getAppointmentById(request, reply);
    })
    // tem que ser user dono do appointment ou o barber dono do appointment
    fastify.delete("/appointment",{preHandler: [authenticate, authorize(['USER', 'BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.delete(request, reply);
    })
    //tem que ser user dono do appointment ou o barber dono do appointment
    fastify.put("/appointment/:id",{preHandler: [authenticate, authorize(['USER', 'BARBER'])]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.update(request, reply);
    })

}