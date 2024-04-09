import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllCourseRegistration } from "../../../services/Inscriptions-service";

export default function ScheduleDashboard() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const specificRoles = [""];
    if (userRole && userRole.some((role) => specificRoles.includes(role))) {
      setLoading(true);
      getAllCourseRegistration()
        .then((data) => {
          const currentDate = new Date();
          const filteredData = data.filter((item: ScheduleType) => {
            const startDate = new Date(item.product.startDateInscription);
            const endDate = new Date(item.product.endDate);
            return currentDate >= startDate && currentDate <= endDate;
          });
          setScheduleData(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener matriculas:", error);
          setLoading(false);
        });
    } else {
      navigate("/dashboard");
    }
  }, [userRole, navigate]);

  type ScheduleType = {
    product: {
      endDate: string | number | Date;
      startDateInscription: string | number | Date;
      name: string;
    };
    coursesWithSchedule: {
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }[];
  };

  const events = scheduleData.map((item: ScheduleType) => ({
    title: item.product.name,
    daysOfWeek: [1],
    startTime: "10:00",
    endTime: "11:30",
    color: "#252850",
  }));

  return (
    <>
      <div className="hidden mx-8 lg:block">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          weekends={true}
          events={events}
          height={505}
          allDaySlot={false}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            meridiem: "short",
          }}
          slotMinTime="08:00:00"
          slotMaxTime="17:00:00"
          locales={[esLocale]}
          headerToolbar={{
            left: "",
            center: "",
            right: "",
          }}
          dayHeaderContent={({ date }) => {
            const dayName = date.toLocaleDateString("es", {
              weekday: "long",
            });
            return dayName.charAt(0).toUpperCase() + dayName.slice(1);
          }}
          nowIndicator={true}
          /* Agregar clases de Tailwind CSS */
          eventClassNames="bg-green-500 text-white rounded-md p-2"
          hiddenDays={[0]} // Oculta el domingo (0 es domingo, 1 es lunes, etc.)
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center lg:hidden">
        <p className="text-neutral-500 text-lg text-center md:text-xl">
          Lo sentimos, esta sección no está disponible para dispositivos móviles
          en este momento.
        </p>
        <p className="text-neutral-300 text-md text-center md:text-lg flex flex-col">
          Te recomendamos acceder desde una computadora para disfrutar de la
          experiencia completa.
          <span>¡Gracias por tu comprensión!</span>
        </p>
      </div>
    </>
  );
}
