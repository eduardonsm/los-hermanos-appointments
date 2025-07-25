import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController  } from "./controllers/UserController";
import { BarberController } from "./controllers/BarberController";
import { AppointmentController } from "./controllers/AppointmentController";
import { ServiceController } from "./controllers/ServiceController";
import { AuthController } from "./controllers/AuthController";

const userController = new UserController();
const barberController = new BarberController();
const appointmentController = new AppointmentController();
const serviceController = new ServiceController();
const authController = new AuthController();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/test",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true };
    })
    //login
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return authController.login(request, reply);
    })
    fastify.delete("/logout",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
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
    fastify.delete("/user",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.delete(request, reply);    
    })
    fastify.get("/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return userController.getUserById(request, reply);
    })

    //tem q ser user e ser o user a dar update
    fastify.put("/user/:id",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
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
    fastify.delete("/barber",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.delete(request, reply);    
    })
    fastify.get("/barber/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.getBarberById(request, reply);    
    })
    fastify.get("/barbers/:barberId/services", async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.listServices(request, reply);   
     })
     //tem que ser barber e ser o barber a associar os servicos
    fastify.post("/barbers/:barberId/associate-services",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.associateServices(request, reply);   
     })
    fastify.get("/barbers/:barberId/appointments",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.listAppointments(request, reply);   
     })
    //tem que ser barber e ser o barber a dar update
    fastify.put("/barber/:id",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return barberController.update(request, reply);
    })
     // services routes

     // tem que ser barber
     fastify.post("/service", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.create(request, reply);
     })
     fastify.get("/services", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.list(request, reply);
     })
     fastify.get("/service/:id", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.getServiceById(request, reply);
     })
     // tem que ser barber
     fastify.delete("/service", async (request: FastifyRequest, reply: FastifyReply) => {
         return serviceController.delete(request, reply);
     })
     // tem que ser barber
     fastify.patch("/service", async (request: FastifyRequest, reply: FastifyReply) => {
            return serviceController.update(request, reply);
     })
     // appointments routes

     // tem que ser user autenticado
    fastify.post("/appointment",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.create(request, reply);
    })
    fastify.get("/appointments", async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.list(request, reply);
    })
    fastify.get("/appointment/:id",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.getAppointmentById(request, reply);
    })
    // tem que ser user dono do appointment ou o barber dono do appointment
    fastify.delete("/appointment",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.delete(request, reply);
    })
    //tem que ser user dono do appointment ou o barber dono do appointment
    fastify.put("/appointment/:id",{preHandler: [fastify.authenticate]}, async (request: FastifyRequest, reply: FastifyReply) => {
        return appointmentController.update(request, reply);
    })

}