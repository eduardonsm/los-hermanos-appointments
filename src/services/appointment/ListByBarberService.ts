import prismaClient from "../../prisma"
interface ListByBarberServiceRequest {
    barberId: number;
}
class ListByBarberService{

    async execute({ barberId }: ListByBarberServiceRequest){

        const appointments = await prismaClient.appointment.findMany({
            where: { barberId }
        });

        return appointments;
    }
    
}

export {ListByBarberService}