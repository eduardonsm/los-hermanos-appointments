import prismaClient from "../../prisma"
import { ListByBarberDTO } from "../../DTO/ListByBarberServiceDTO";
class ListByBarberService{

    async execute({ barberId }: ListByBarberDTO){

        const appointments = await prismaClient.appointment.findMany({
            where: { barberId }
        });

        return appointments;
    }
    
}

export {ListByBarberService}