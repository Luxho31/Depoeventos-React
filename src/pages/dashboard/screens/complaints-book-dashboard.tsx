import { Button, Modal, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import {
  getAllComplaintsBooks,
  updateComplaintsBookStatus,
} from "../../../services/complaints-book-service";

function ComplaintsBookDashboard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [complaintsBookData, setComplaintsBookData] = useState<any[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { userRole } = useAuth();

  const navigate = useNavigate();

  const specificRole: string = "ADMIN";
  useEffect(() => {
    if (userRole && userRole.some((role) => role === specificRole)) {
      handleReload();
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  useEffect(() => {
    const timeoutId = setTimeout(() => handleReload(), 400);
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  const handleReload = async () => {
    setLoading(true);
    try {
      const response = await getAllComplaintsBooks();
      console.log("ComplaintsBookDashboard -> response", response);
      setComplaintsBookData(response);
    } catch (error) {
      console.error("Error al cargar los reclamos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (id: number, status: string) => {
    try {
      await updateComplaintsBookStatus(id, status);
      handleReload();
    } catch (error) {
      console.error("Error al aprobar el testimonio:", error);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page - 1);
  };


  return (
    <div className="h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="w-fit">
                <th scope="col" className="px-6 py-3">
                  Usuario
                </th>
                <th scope="col" className="px-2 py-3">
                  Documento
                </th>
                <th scope="col" className="px-6 py-3">
                  Producto o Servicio
                </th>
                <th scope="col" className="px-2 py-3">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {complaintsBookData.map((complaints, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 w-1/8">
                    <div className="flex flex-col">
                      <p>{complaints.fullName}</p>
                      <p className="text-xs text-gray-400">
                        {complaints.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-2 py-4 ">
                    <div className="flex flex-col">
                      <p>{complaints.documentNumber}</p>
                      <p className="text-xs text-gray-400">
                        {complaints.documentType}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <p>{complaints.productOrServiceDetail}</p>
                      <p className="text-xs text-gray-400">
                        {complaints.requestType}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <>
                      <Button onClick={() => setIsModalOpen(true)}>
                        Ver más
                      </Button>
                      <Modal
                        title="Descripción"
                        open={isModalOpen}
                        onOk={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                        footer={[]}
                      >
                        <p>{complaints.description}</p>
                      </Modal>
                    </>
                  </td>
                  <td className="px-6 py-4">
                    {complaints.incidentDate.split("T")[0]}
                  </td>
                  <td className="h-full flex mt-4 items-center justify-center  gap-x-3">
                    <Select
                      options={[
                        {
                          label: "Pendiente",
                          value: "PENDING",
                          disabled: complaints.status === "PENDING",
                        },
                        {
                          label: "Resuelto",
                          value: "RESOLVED",
                          disabled: complaints.status === "RESOLVED",
                        },
                      ]}
                      defaultValue={complaints.status}
                      onChange={(value) =>
                        handleChangeStatus(complaints.id, value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        className="mt-4"
        current={currentPage + 1}
        total={complaintsBookData.length}
        pageSize={10}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default ComplaintsBookDashboard;
