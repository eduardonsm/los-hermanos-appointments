import prismaClient from "../../prisma";

class GetBarberByIdService {
    async execute(id: number) {
        const barber = await prismaClient.barber.findUnique({
            where: { id }
        });
        return barber;
    }
}

export { GetBarberByIdService };