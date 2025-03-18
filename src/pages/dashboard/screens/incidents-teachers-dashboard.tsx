import { Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import IncidentsTeachersModal from "../modals/incidents-teachers-modal-dashboard";
import { MdOutlineDescription } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { getIncidentsByTeacher } from "../../../services/incidents-service";

function IncidentsTeachersDashboard() {
  const [, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCreateIncidentModal, setOpenCreateIncidentModal] = useState(false);
  const { userRole } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      userRole &&
      userRole.some((role) => role === "TEACHER" || role === "ADMIN")
    ) {
      handleReload();
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  useEffect(() => {
    const timeoutId = setTimeout(() => handleReload(), 400);
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  const showModal = (incident: any) => {
    setSelectedIncident(incident);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedIncident(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedIncident(null);
  };

  const handleReload = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;

      const response = await getIncidentsByTeacher(userId);
      setData(response);
    } catch (error) {
      console.error("Error al cargar los incidentes:", error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between shadow-md sm:rounded-lg">
          <h1 className="text-base text-gray-500 ml-10">
            Incidentes de profesores
          </h1>
          <button
            className="flex items-center justify-center gap-x-2 py-2 px-4 rounded mr-10 border"
            onClick={() => setOpenCreateIncidentModal(true)}
          >
            <p>Crear incidente</p> <FaRegPlusSquare />
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="w-fit">
                <th scope="col" className="px-6 py-3">
                  Curso
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Sede
                </th>
                <th scope="col" className="px-6 py-3">
                  Alumno/s implicados
                </th>
                <th scope="col" className="px-6 py-3">
                  Alumno/s testigos
                </th>
                <th scope="col" className="px-6 py-3">
                  Detalle
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((incident) => (
                <tr key={incident.id} className="border-b border-gray-200">
                  {/* Curso - Assuming it’s from the "products" field */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {incident.products.length > 0
                      ? incident.products[0].name
                      : "N/A"}
                  </td>

                  {/* Horario - Assuming it's from "products" startDate */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {incident.products.length > 0
                      ? incident.typeIncident
                      : "N/A"}
                  </td>

                  {/* Horario - Assuming it's from "products" startDate */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {incident.products.length > 0
                      ? incident.date.substring(0, 19).replace("T", " ")
                      : "N/A"}
                  </td>

                  {/* Sede - Assuming it's from "products" campuses */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {incident.products.length > 0 &&
                    incident.products[0].campuses.length > 0
                      ? incident.products[0].campuses
                          .map((c: any) => c.name)
                          .join(", ")
                      : "N/A"}
                  </td>

                  {/* Alumno/s implicados */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {incident.students.map((s: any) => s.name).join(", ") ||
                      "N/A"}
                  </td>

                  {/* Alumno/s testigos */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {incident.witnesses.map((w: any) => w.name).join(", ") ||
                      "N/A"}
                  </td>

                  {/* Detalle */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showModal(incident)}
                      className="font-bold py-2 px-4 rounded border hover:bg-gray-200"
                    >
                      <MdOutlineDescription />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for showing incident details */}
      <Modal
        title={`Detalles del Incidente `}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
        destroyOnClose
        width={800}
        footer={null}
        className="overflow-y-auto"
      >
        {selectedIncident ? (
          <div className="space-y-4">
            {/* Sección de Información General */}
            <h2 className="text-lg font-semibold">Información General</h2>
            <p>
              <strong>Descripción:</strong>{" "}
              {selectedIncident.description || "N/A"}
            </p>
            <p>
              <strong>Tipo:</strong> {selectedIncident.typeIncident || "N/A"}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {selectedIncident.date?.substring(0, 19).replace("T", " ") ||
                "N/A"}
            </p>

            <hr />

            {/* Sección de Profesores Involucrados */}
            <h2 className="text-lg font-semibold">Profesores Involucrados</h2>
            <ul className="list-disc pl-4">
              {selectedIncident.teachers.length > 0 ? (
                selectedIncident.teachers.map((t: any) => (
                  <li key={t.id}>
                    {t.firstName} {t.lastName} ({t.documentType}:{" "}
                    {t.documentNumber})
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>

            <hr />

            {/* Sección de Alumnos Implicados */}
            <h2 className="text-lg font-semibold">Alumnos Implicados</h2>
            <ul className="list-disc pl-4">
              {selectedIncident.students.length > 0 ? (
                selectedIncident.students.map((s: any) => (
                  <li key={s.id}>
                    {s.name} {s.lastName} ({s.documentType}: {s.documentNumber})
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>

            <hr />

            {/* Sección de Testigos */}
            <h2 className="text-lg font-semibold">Testigos</h2>
            <ul className="list-disc pl-4">
              {selectedIncident.witnesses.length > 0 ? (
                selectedIncident.witnesses.map((w: any) => (
                  <li key={w.id}>
                    {w.name} {w.lastName} ({w.documentType}: {w.documentNumber})
                  </li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </ul>

            <hr />

            {/* Sección de Productos Relacionados */}
            <h2 className="text-lg font-semibold">Productos Relacionados</h2>
            {selectedIncident.products.length > 0 ? (
              selectedIncident.products.map((p: any) => (
                <div key={p.id} className="border p-2 rounded-md bg-gray-100">
                  <p>
                    <strong>Nombre:</strong> {p.name}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {p.description}
                  </p>
                  <p>
                    <strong>Ubicación:</strong> {p.location}
                  </p>
                  <p>
                    <strong>Activo:</strong> {p.active ? "Sí" : "No"}
                  </p>
                </div>
              ))
            ) : (
              <p>N/A</p>
            )}
          </div>
        ) : (
          "Cargando detalles..."
        )}
      </Modal>

      <IncidentsTeachersModal
        open={openCreateIncidentModal}
        setOpen={setOpenCreateIncidentModal}
        handleReload={handleReload}
      />

      <Pagination
        className="mt-4"
        current={currentPage + 1}
        pageSize={10}
        total={data.length}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default IncidentsTeachersDashboard;
