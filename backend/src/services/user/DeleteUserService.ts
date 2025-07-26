import prismaClient from "../../prisma";

interface IDeleteUserRequest{
    id: number;
}
class DeleteUserService{
    async execute({id}:IDeleteUserRequest){
        if(!id){
            throw new Error("ID is required");
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })
        if(!user){
            throw new Error("User not found");
        }
        await prismaClient.user.delete({
            where: {
                id: id
            }
        })
        return user;
    }
    
}

export {DeleteUserService}