import prismaClient from "../../prisma"
interface ICreateBarber{
    name: string;
    password: string;
    email: string;
    phone: string;
}
class CreateBarberService{

    async execute({ name, email, phone, password }: ICreateBarber){

        const barber = await prismaClient.barber.create({
            data: {
                name,
                password,
                email,
                phone,
                status: true, // Assuming the barber is active by default
            }
        });

        return barber;

    }
}

export {CreateBarberService}