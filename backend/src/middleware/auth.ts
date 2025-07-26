import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyJWT } from '@fastify/jwt'

export async function authenticate (req: FastifyRequest, reply: FastifyReply)  {
  try {
    await req.jwtVerify()
  } catch (err) {
    console.error('Authentication error:', err);
    reply.status(401).send({ message: 'Invalid Token' })
  }
 }

