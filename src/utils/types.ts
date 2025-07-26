import { JWT } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
}
type TokenPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
};

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: TokenPayload;
  }
}

