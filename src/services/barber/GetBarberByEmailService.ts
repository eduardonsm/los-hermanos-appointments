import prismaClient from "../../prisma";

class GetBarberByEmailService {
    async execute(email: string) {
        const barber = await prismaClient.barber.findUnique({
            where: { email }
        });
        return barber;
    }
}

export { GetBarberByEmailService };