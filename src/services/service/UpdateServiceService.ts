import prismaClient from "../../prisma"
interface IUpdateServiceService{
    id: number;
    name?: string;
    price?: number;
    duration?: number;
}
class UpdateServiceService{

    async execute({ id, name, price, duration }: IUpdateServiceService){

        if(!id){
            throw new Error("ID is required");
        }

        const service = await prismaClient.service.findUnique({
            where: {
                id: id
            }
        })
        if(!service){
            throw new Error("Service not found");
        }
        if(!name && !price && !duration){
            throw new Error("At least one field is required");
        }
        const data: any = {};
        if (name!== undefined){
            data.name = name;
        }
        if (price!== undefined){
            data.price = price;
        }
        if (duration!== undefined){
            data.duration = duration;
        }
        await prismaClient.service.update({
            where: {
                id: id
            },
            data
        })
        return service;
    }
}

export {UpdateServiceService}