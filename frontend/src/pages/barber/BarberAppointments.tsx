import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { format } from "date-fns";

function formatDate(dateString: string) {
  return format(new Date(dateString), "dd/MM/yy HH:mm");
}
function addMinutes(dateString: string, minutes: number) {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}
interface AppointmentProps {
  id: number;
  userId:  number;
  date: string;
  totalPrice: number;  
  status: string;
}
interface UserProps {
  name: string;
  email: string;
  phone: string;
}
interface ServiceProps {
  name: string;
  price: number;
  duration: number;
}
interface AppointmentDetailsProps {
  id: number;
  userId:  number;
  date: string;
  totalDuration: number;
  totalPrice: number;
  user: UserProps;
  services: ServiceProps[]
  status: string;
}

export default function BarberAppointments() {
  const [barberInfo, setBarberInfo] = useState<any>(null);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetailsProps | null>(null);

  async function loadAppointments() {
    const barberInfo = await api.get("/me", { withCredentials: true });
    setBarberInfo(barberInfo);
    const response = await api.get(`/barbers/${barberInfo.data.id}/appointments`);
    setAppointments(await response.data);
  }
  useEffect(() => {
    loadAppointments();
  }, []);
  
  async function loadAppointmentDetails(appointmentId: number) {
    const { data: appointment } = await api.get(`appointment/${appointmentId}`);
    const { data: user } = await api.get(`user/${appointment.userId}`);
    setSelectedAppointment({ ...appointment, user });
  }

  return (
    <div className="w-full min-h-screen bg-amber-50 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-xl">My Appointments</h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          <div className="flex flex-col gap-3 p-10  bg-amber-200 rounded-2xl m-10">
            <section className="flex flex-col gap-4">
              {appointments.map((appointment) => (
                <article key={appointment.id} className="w-full bg-white rouded-md p-2 relative hover:scale-105 transition-all duration-200"
                 onClick={() => loadAppointmentDetails(appointment.id)}>
                  
                  <p> <span className="font-medium">User ID:</span> {appointment.userId}</p>
                  <p> <span className="font-medium">Date:</span> {formatDate(appointment.date)}</p>
                  <p> <span className="font-medium">totalPrice:</span> {appointment.totalPrice}</p>
                  <p> <span className="font-medium">Status:</span> {appointment.status} </p>
                </article>
              ))
              }
            </section>

          </div>
        </div>
        {/* Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>
              <p><span className="font-medium">User Name:</span> {selectedAppointment.user.name}</p>
              <p><span className="font-medium">User Email:</span> {selectedAppointment.user.email}</p>
              <p><span className="font-medium">User Phone:</span> {selectedAppointment.user.phone}</p>
              <p><span className="font-medium">Begin:</span> {formatDate(selectedAppointment.date)}</p>
              <p><span className="font-medium">End:</span> {formatDate(addMinutes(selectedAppointment.date, selectedAppointment.totalDuration).toISOString())}</p>
              <p><span className="font-medium">Services Requested:</span>
                {selectedAppointment.services.map((service) => (
                  <p className="ml-4 bg-gray-300 p-2 rounded-md" key={service.name}>{service.name} - R${service.price} - {service.duration} min</p>
                ))}
              </p>
              <p><span className="font-medium">Total Price: R$</span> {selectedAppointment.totalPrice}</p>
              <p><span className="font-medium">Total Duration:</span> {selectedAppointment.totalDuration} min</p>
              <p><span className="font-medium">Status:</span> {selectedAppointment.status}</p>
              
              <button
                onClick={() => setSelectedAppointment(null)}
                className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
