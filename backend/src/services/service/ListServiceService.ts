import prismaClient from "../../prisma"

class ListServiceService{

    async execute(){
        const services = await prismaClient.service.findMany();
        return services;
    }

}

export {ListServiceService}