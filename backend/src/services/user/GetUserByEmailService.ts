import prismaClient from "../../prisma";

class GetUserByEmailService {
    async execute(email: string) {
        const user = await prismaClient.user.findUnique({
            where: { email }
        });
        return user;
    }
}

export { GetUserByEmailService };