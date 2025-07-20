// src/types/fastify.d.ts
import { JWT } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
        authenticate: any

  }
}
type TokenPayload = {
  id: string
  email: string
  name: string
  role: 'USER' | 'BARBER'
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    tokenPayload: TokenPayload
  }
}

