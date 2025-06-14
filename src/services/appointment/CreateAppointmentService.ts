import prismaClient from "../../prisma";

interface CreateAppointmentRequest {
    userId: number;
    barberId: number;
    date: Date;
    services: number[];
}

class CreateAppointmentService {
    async execute({ userId, barberId, date, services }: CreateAppointmentRequest) {
        let totalDuration = 0;
        let totalPrice = 0;

        const serviceList = await Promise.all(
            services.map(async (serviceId) => {
                const service = await prismaClient.service.findUnique({
                    where: { id: serviceId }
                });

                if (!service) {
                    throw new Error(`Service with ID ${serviceId} not found`);
                }

                totalDuration += service.duration;
                totalPrice += service.price;

                return service;
            })
        );

        const appointment = await prismaClient.appointment.create({
            data: {
                userId,
                barberId,
                date,
                services: {
                    connect: services.map((serviceId) => ({ id: serviceId }))
                },
                totalPrice,
                totalDuration
            }
        });

        return appointment;
    }
}

export { CreateAppointmentService }
