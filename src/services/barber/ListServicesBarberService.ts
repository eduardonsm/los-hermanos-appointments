import prismaClient from "../../prisma"
interface IListServicesBarberRequest {
    barberId: number;
}
class ListServicesBarberService{

    async execute({ barberId }: IListServicesBarberRequest){

        const barber = await prismaClient.barber.findUnique({
            where: {
                id: barberId
            },
            include: {
                services: true
            }
        });

        if (!barber) {
            throw new Error("Barber not found");
        }

        return barber.services;
    }

}

export {ListServicesBarberService}