import { AppointmentStatus } from "../../../generated/prisma";
import prismaClient from "../../prisma";
import { validateTimeSlot } from "../../utils/validadeTimeSlot";
interface IUpdateAppointmentData {
    date?: Date;
    status?: AppointmentStatus;
}
interface IUpdateAppointmentService {
    id: number;
    data: IUpdateAppointmentData;
}

class UpdateAppointmentService {
    /**
     * Atualiza os dados de um agendamento.
     * @param id ID do agendamento a ser atualizado
     * @param data Dados a serem atualizados
     */
    async execute({ id, data }: IUpdateAppointmentService) {
        const appointmentToUpdate = await prismaClient.appointment.findUnique({
            where: {
                id: id,
            },
        });
        if (!appointmentToUpdate) {
            throw new Error("Appointment not found");
        }
        if (data.date) {
            await validateTimeSlot(
                appointmentToUpdate.barberId,
                data.date,
                appointmentToUpdate.totalDuration
            );
        }
        const updatedAppointment = await prismaClient.appointment.update({
            where: {
                id: id,
            },
            data: {
                date: data.date,
                status: data.status,
            },
        });
        
        return updatedAppointment;
    }
}

export { UpdateAppointmentService };