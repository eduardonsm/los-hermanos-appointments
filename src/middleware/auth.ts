import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyJWT } from '@fastify/jwt'

export async function authenticate (req: FastifyRequest, reply: FastifyReply)  {
  const token = req.cookies.access_token
  if (!token) {
    return reply.status(401).send({ message: 'Authentication required' })
  }
  const decoded = req.jwt.verify<FastifyJWT['tokenPayload']>(token)
  req.user = decoded
 }
 
