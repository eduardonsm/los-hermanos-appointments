import prismaClient from "../../prisma"
interface IDeleteServiceService{
    id: number;
}
class DeleteServiceService{

    async execute({ id }: IDeleteServiceService){

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
        await prismaClient.service.delete({
            where: {
                id: id
            }
        })
        return service;
    }

}

export {DeleteServiceService}