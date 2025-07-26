import prismaClient from "../../prisma";

class GetUserByIdService {
    async execute(id: number) {
        const user = await prismaClient.user.findUnique({
            where: { id }
        });
        return user;
    }
}

export { GetUserByIdService };