import { ListByBarberService } from "../services/appointment/ListByBarberService";

/**
 * Valida se o barbeiro existe e se ele oferece todos os serviços solicitados.
 * @param barberId ID do barbeiro
 * @param date Data do agendamento
 * @param totalDuration Duração total dos serviços solicitados
 */
export async function validateTimeSlot(barberId: number, date: Date, totalDuration: number) {
    const listbybarber = new ListByBarberService();
    const appointments = await listbybarber.execute({ barberId });
    const newAppointmentStart: Date = new Date(date);
    const newAppointmentEnd: Date = new Date(newAppointmentStart.getTime() + totalDuration * 60000);

    for (const appointment of appointments) {
        const existingAppointmentStart: Date = new Date(appointment.date);
        const existingAppointmentEnd: Date = new Date(existingAppointmentStart.getTime() + appointment.totalDuration * 60000); 

        if (!(existingAppointmentStart > newAppointmentEnd || existingAppointmentEnd < newAppointmentStart)) {
            throw new Error("Appointment conflict, Interval Time Invalid");
        }
    }
}