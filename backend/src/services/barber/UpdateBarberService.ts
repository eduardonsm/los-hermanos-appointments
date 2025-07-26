import prismaClient from "../../prisma"
interface IUpdateBarberData {
    name?: string;
    email?: string;
    phone?: string;
}

interface IUpdateBarberService {
    id: number;
    data: IUpdateBarberData;
}
class UpdateBarberService{

    async execute({ id, data }: IUpdateBarberService){

        const reply = await prismaClient.barber.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone
            }
        })
        return reply;
    }
}

export {UpdateBarberService}