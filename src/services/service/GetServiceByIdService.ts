import prismaClient from "../../prisma";
interface getServiceByIdRequest {
    id: number;
}
class GetServiceByIdService {

    async execute({ id }: getServiceByIdRequest) {
        const service = await prismaClient.service.findUnique({
            where: { id }
        });
        return service;
    }
}
export { GetServiceByIdService };