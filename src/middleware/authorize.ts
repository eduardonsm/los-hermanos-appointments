import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyJWT } from '@fastify/jwt'
import { Console } from "console";

export function authorize( permissions: string[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = req.user;
    const role = user.role;
    if (permissions.includes(role)) {
      return;
    } else{
      return reply.status(403).send({ message: 'Forbidden: You do not have permission to access this resource.'});
    }

  };
 }
 
