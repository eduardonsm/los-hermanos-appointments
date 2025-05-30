import prismaClient from "../../prisma"
class ListBarberService{

    async execute(){
        const barbers = await prismaClient.barber.findMany();
        return barbers;
    }

}

export {ListBarberService}