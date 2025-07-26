import prismaClient from "../../prisma"


class DeleteAppointmentService{

    async execute(appointmentId: number){
        // Check if the appointment exists
        const appointment = await prismaClient.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!appointment) {
            throw new Error(`Appointment with ID ${appointmentId} not found`);
        }

        await prismaClient.appointment.delete({
            where: { id: appointmentId }
        });
    }

}

export {DeleteAppointmentService}