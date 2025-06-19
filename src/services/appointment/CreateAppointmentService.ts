import prismaClient from "../../prisma";

interface CreateAppointmentRequest {
    userId: number;
    barberId: number;
    date: Date;
    services: number[]; // Array de IDs dos serviços
}

class CreateAppointmentService {
    async execute({ userId, barberId, date, services }: CreateAppointmentRequest) {
        
        if (!services || services.length === 0) {
            throw new Error("At least one service must be selected.");
        }

        await this.validateBarberAndServices(barberId, services);

        const foundServices = await prismaClient.service.findMany({
            where: {
                id: {
                    in: services
                }
            }
        });

        const { totalPrice, totalDuration } = foundServices.reduce(
            (acc, service) => {
                acc.totalPrice += service.price;
                acc.totalDuration += service.duration;
                return acc;
            },
            { totalPrice: 0, totalDuration: 0 }
        );

        const appointment = await prismaClient.appointment.create({
            data: {
                userId,
                barberId,
                date,
                totalPrice,
                totalDuration,
                services: {
                    connect: services.map((serviceId) => ({ id: serviceId }))
                }
            },
            include: {
                services: true
            }
        });

        return appointment;
    }

    /**
     * Valida se o barbeiro existe e se ele oferece todos os serviços solicitados.
     * @param barberId ID do barbeiro
     * @param servicesIds IDs dos serviços solicitados
     */
    private async validateBarberAndServices(barberId: number, servicesIds: number[]) {
        const barberExists = await prismaClient.barber.findUnique({
            where: { id: barberId },
            select: { id: true } 
        });

        if (!barberExists) {
            throw new Error(`Barber with ID ${barberId} not found`);
        }

        const servicesCount = await prismaClient.service.count({
            where: {
                id: {
                    in: servicesIds, 
                },
                barbers: {
                    some: {
                        id: barberId, 
                    },
                },
            },
        });

        if (servicesCount !== servicesIds.length) {
            throw new Error(`One or more services are not offered by the barber with ID ${barberId}`);
        }
    }
}

export { CreateAppointmentService };