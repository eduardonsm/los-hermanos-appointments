import prismaClient from "../../prisma"
interface IAssociateServicesBarberRequest {
    barberId: number;
    servicesIds: number[];
}
class AssociateServicesBarberService{

    async execute({ barberId, servicesIds }: IAssociateServicesBarberRequest){

        const barber = await prismaClient.barber.findUnique({
            where: {
                id: barberId
            }
        });

        if (!barber) {
            throw new Error("Barber not found");
        }
        
        await prismaClient.barber.update({
            where: {
                id: barberId
            },
            data: {
                services: {
                    connect: servicesIds.map(id => ({ id }))
                }
            }
        });

        return { barber, servicesIds };
    }

}

export {AssociateServicesBarberService}