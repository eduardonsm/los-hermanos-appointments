import { FastifyReply, FastifyRequest } from "fastify";
import {GetBarberByEmailService} from "../services/barber/GetBarberByEmailService";
import {GetUserByEmailService} from "../services/user/GetUserByEmailService";

class AuthController {
    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as {
            email: string;
            password: string;
        };
        if (!email || !password) {
            return reply.status(400).send({ message: 'Email and password are required.' });
        }

        const getBarberByEmail = new GetBarberByEmailService();
        let entity = await getBarberByEmail.execute(email);
        let role = "BARBER";
        if (!entity) {
            const getUserByEmail = new GetUserByEmailService();
            entity = await getUserByEmail.execute(email);
            role = "USER";
        }
        if (!entity || entity?.password !== password) {
            return reply.status(401).send({ message: 'Invalid email or password' });
        }
        const payload = {
            id: entity.id,
            email: entity.email,
            name: entity.name,
            role
        };
        const token = request.jwt.sign(payload);
        reply.setCookie('access_token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
        })
        return { accessToken: token }

    }
    async logout(request: FastifyRequest, reply: FastifyReply) {
        reply.clearCookie('access_token');
        return reply.status(200).send({ message: 'Logout successful' });
    }
}
export {AuthController}