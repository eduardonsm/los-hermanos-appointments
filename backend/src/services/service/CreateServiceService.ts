import prismaClient from "../../prisma";
interface ICreateService{
    name: string;
    price: number;
    duration: number;
}
class CreateServiceService{

    async execute({ name, price, duration }: ICreateService){

        const service = await prismaClient.service.create({
            data: {
                name,
                price,
                duration
            }
        });
        return service;
    }
}

export {CreateServiceService}