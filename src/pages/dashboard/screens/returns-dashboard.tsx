import { Divider, Form, Input, Modal, Pagination } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllReturns } from "../../../services/return-service";

const ModalData = ({ data }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={showModal} className="text-blue-500 hover:text-blue-700">
        <FaEye />
      </button>
      <Modal
        title={`Detalles de la Devolución (ID: ${data.id})`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
        destroyOnClose
        width={800}
        footer={null}
      >
        <Form layout="vertical" className="w-full">
          {/* Sección de datos del producto */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Descripción del Producto">
              <Input disabled value={data.product.description} />
            </Form.Item>
            <Form.Item label="Fecha de Inicio del Producto">
              <Input disabled value={data.product.startDate} />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Inicio de Inscripción">
              <Input disabled value={data.product.startDateInscription} />
            </Form.Item>
            <Form.Item label="Fin de Inscripción">
              <Input disabled value={data.product.endDateInscription} />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Ubicación">
              <Input disabled value={data.product.location} />
            </Form.Item>
            <Form.Item label="Producto Activo">
              <Input disabled value={data.product.active ? "Sí" : "No"} />
            </Form.Item>
          </div>
          <Divider />

          {/* Sección de datos del niñ@ y documento */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Fecha de Nacimiento del Niñ@">
              <Input disabled value={data.children.birthdate} />
            </Form.Item>
            <Form.Item label="Documento (Tipo - Número)">
              <Input
                disabled
                value={`${data.children.documentType} - ${data.children.documentNumber}`}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="País">
              <Input disabled value={data.user.country} />
            </Form.Item>
            <Form.Item label="Documento y Contacto del Padre/Madre">
              <Input
                disabled
                value={`${data.user.documentType} - ${data.user.documentNumber} | Tel: ${data.user.contactNumber}`}
              />
            </Form.Item>
          </div>
          <Divider />

          {/* Sección de devolución */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Razón de Devolución">
              <Input.TextArea disabled value={data.reason} />
            </Form.Item>
            <Form.Item label="Eliminar Matrícula">
              <Input disabled value={data.deleteRegistration ? "Sí" : "No"} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default function ReturnsDashboard() {
  const [returnsData, setReturnsData] = useState<any[]>([]);
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
    try {
      const response = await getAllReturns();
      setReturnsData(response);
      console.log("Data", returnsData);
    } catch (error) {
      console.error("Error al cargar las devoluciones:", error);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-lg text-gray-600 ml-8 font-mono">Devoluciones</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="w-fit">
                <th scope="col" className="px-6 py-3">
                  Niñ@
                </th>
                <th scope="col" className="px-6 py-3">
                  Padre/Madre
                </th>
                <th scope="col" className="px-6 py-3">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio devuelto / Precio total
                </th>

                <th scope="col" className="px-6 py-3">
                  Más detalles
                </th>
              </tr>
            </thead>
            <tbody>
              {returnsData.map((_return, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {_return.children.name} {_return.children.lastName}
                  </td>
                  <td className="px-6 py-4">
                    {_return.user.firstName} {_return.user.lastName}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p>{_return.product.name}</p>
                      <p className="text-xs">
                        {_return.product.campuses
                          .map((campus: any) => campus.name)
                          .join(", ")}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <p>
                        {_return.price === _return.product.price
                          ? "Devuelto completo"
                          : "Devuelto parcialmente"}
                      </p>
                      <section>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full text-center text-xs text-white bg-green-500 rounded-full"
                            style={{
                              width: `${
                                (_return.price / _return.product.price) * 100
                              }%`,
                            }}
                          />
                          <section className="flex gap-x-2">
                            <p>
                              S/.{_return.price} / S/.{_return.product.price}
                            </p>
                            <p>
                              (
                              {_return.price === _return.product.price
                                ? "100%"
                                : `${(
                                    (_return.price / _return.product.price) *
                                    100
                                  ).toFixed(1)}%`}
                              )
                            </p>
                          </section>
                        </div>
                      </section>
                    </div>
                  </td>

                  <td className="px-10 py-4">
                    <ModalData data={_return} />
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
        total={returnsData.length}
        pageSize={20}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}
