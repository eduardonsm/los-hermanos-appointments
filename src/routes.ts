import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController  } from "./controllers/UserController";


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

}