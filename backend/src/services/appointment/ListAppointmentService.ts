import prismaClient from "../../prisma"

class ListAppointmentService{

    async execute(){
        const appointments = await prismaClient.appointment.findMany();
        return appointments;
    }
    
}

export {ListAppointmentService}