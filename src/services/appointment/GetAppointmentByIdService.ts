import prismaClient from "../../prisma";
interface getAppointmentByIdRequest {
    id: number;
}
class GetAppointmentByIdService {

    async execute({ id }: getAppointmentByIdRequest) {
        const appointment = await prismaClient.appointment.findUnique({
            where: { id }
        });
        return appointment;
    }
}
export { GetAppointmentByIdService };