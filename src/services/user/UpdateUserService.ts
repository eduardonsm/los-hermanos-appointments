import prismaClient from "../../prisma"
interface IUpdateUserData {
    name?: string;
    email?: string;
    phone?: string;
}

interface IUpdateUserService {
    id: number;
    data: IUpdateUserData;
}
class UpdateUserService{

    async execute({ id, data }: IUpdateUserService){

        const reply = await prismaClient.user.update({
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

export {UpdateUserService}