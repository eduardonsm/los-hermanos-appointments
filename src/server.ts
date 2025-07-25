import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import {FastifyRequest, FastifyReply } from "fastify";

const app = fastify({ logger: true });
// jwt
app.register(fjwt, { secret: 'supersecretcode-CHANGE_THIS-USE_ENV_FILE' })
app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt
  return next()
})
// cookies
app.register(fCookie, {
 secret: 'some-secret-key',
 hook: 'preHandler',
})
// //authentication
// app.decorate(
//  'authenticate',
//  async (req: FastifyRequest, reply: FastifyReply) => {
//   const token = req.cookies.access_token
//   if (!token) {
//     return reply.status(401).send({ message: 'Authentication required' })
//   }
//   const decoded = req.jwt.verify<FastifyJWT['tokenPayload']>(token)
//   req.user = decoded
//  },
// )
const start = async () => {
  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
   }); 

  await app.register(routes);

  try {
    await app.listen({
      port: Number(process.env.PORT) || 3333,
      host: '0.0.0.0'
     });
    console.log("Server is running on http://localhost:3333");
  } catch (err) {
    process.exit(1);
  }

};

start();