import { useEffect, useState } from "react";
import { CiCalendarDate, CiShoppingTag } from "react-icons/ci";
import { MdOutlineSchool } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useAuth } from "../../../context/AuthProvider";

const IncreaseStudentsGrade = () => {
  const [lock, setLock] = useState(false);

  const handleIncreaseStudentsGrade = async () => {
    if (lock) {
      toast.error("Solo se puede aumentar una vez", {
        description: "Ya se aumentó el grado de los alumnos.",
      });
      return;
    }

    try {
      setLock(true);
      toast.success("Grado de alumnos aumentado correctamente", {
        description: "El grado de los alumnos creados aumentó en 1 grado.",
      });
    } catch (error) {
      console.error("Error al aumentar grado de alumnos:", error);
      toast.error("Error al aumentar grado de alumnos", {
        description: "Ocurrió un error al aumentar el grado de los alumnos.",
      });
    }
  };

  return (
    <button
      onClick={handleIncreaseStudentsGrade}
      disabled={lock}
      className={`px-4 py-2 text-white rounded ${
        lock
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      Aumentar grado
    </button>
  );
};

const ConfigurationItems = [
  {
    name: "Aumentar grado de alumnos",
    description: "Aumenta el grado de los alumnos en 1 grado.",
    action: <IncreaseStudentsGrade />,
    icon: <MdOutlineSchool size={20} />,
  },
  {
    name: "Cupones",
    description: "Administra los cupones de descuento.",
    action: <span className="text-gray-400">Próximamente...</span>,
    icon: <CiShoppingTag size={20} />,
  },
  {
    name: "Inicio y fin de matriculas",
    description: "Establece el inicio y fin de matriculas.",
    action: <span className="text-gray-400">Próximamente...</span>,
    icon: <CiCalendarDate size={20} />,
  },
];

export default function ConfigurationDashboard() {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const specificRole = "ADMIN";

  useEffect(() => {
    if (userRole && userRole.some((role) => role === specificRole)) {
      handleReload();
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  const handleReload = async () => {
    try {
      console.log("Cargando configuración...");
    } catch (error) {
      console.error("Error al cargar la configuración:", error);
    }
  };

  return (
    <div className="h-full">
      <Toaster richColors />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-lg text-gray-600 ml-8 font-mono">Configuración</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-3 py-3"></th>
                <th className="px-6 py-3">Configuración</th>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {ConfigurationItems.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-6 py-4">{item.icon}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 text-sm">{item.description}</td>
                  <td className="px-6 py-4">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
