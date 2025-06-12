import prismaClient from "../../prisma"
interface IDeleteBarberRequest {
    id: number;
}
class DeleteBarberService{

    async execute({id}:IDeleteBarberRequest){
        if (!id) {
            throw new Error("ID is required");
        }
        const barber = await prismaClient.barber.findUnique({
            where: {
                id: id
            }
        });
        if (!barber) {
            throw new Error("Barber not found");
        }
        await prismaClient.barber.delete({
            where: {
                id: id
            }
        });
        return barber;
    }

}

export {DeleteBarberService}