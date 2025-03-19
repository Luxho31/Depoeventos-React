import { Form, Radio } from "antd";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  createAssist,
  getAssistsByDateAndCourseHandler,
} from "../../../../services/assists-service";
import { getChildrenByProduct } from "../../../../services/products-service";

export default function AssistsDashboardId() {
  const { id, date }: any = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState([] as any[]);
  const [lock, setLock] = useState(false);

  const states = ["presente", "ausente", "tardanza", "justificado"];

  useEffect(() => {
    getChildrenByCourseHandler();
    handleGetAssists();
  }, []);

  const getChildrenByCourseHandler = async () => {
    const response = await getChildrenByProduct(id);
    if (response && response.length > 0) {
      setData(response);
    } else {
      setData([]);
    }
  };

  const handleAttendanceChange = (participantId: any, value: any) => {
    setData((prevData) =>
      prevData.map((participant) =>
        participant.id === participantId
          ? { ...participant, attendance: value }
          : participant
      )
    );
  };

  const handleSendAssists = async (val: any) => {
    const body = {
      date,
      productId: id,
      assists: data.map((participant) => ({
        childrenId: participant.id,
        state: val[`attendance-${participant.id}`],
      })),
    };
    try {
      await createAssist(body);
      toast.success("Asistencia creada correctamente");
      handleGetAssists();
    } catch (error) {
      console.error("Error al crear asistencia", error);
      toast.error("Error al crear asistencia");
    }
  };

  const handleGetAssists = async () => {
    try {
      const response = await getAssistsByDateAndCourseHandler(id, date);
      if (response) {
        setData(response);
        setLock(true);
      }
    } catch (error) {
      console.error("Error al cargar las asistencias", error);
    } finally {
      setLock(false);
    }
  };

  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <button
          className="m-4 font-semibold text-lg hover:cursor-pointer"
          onClick={() => window.history.back()}
          type="button"
        >
          <FaAngleLeft />
        </button>
        <p className="text-gray-500 text-lg">
          No hay participantes disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Form
          form={form}
          layout="vertical"
          name="attendanceForm"
          initialValues={{}}
          onFinish={handleSendAssists}
        >
          <div className="flex w-full justify-between">
            <button
              className="m-4 font-semibold text-lg hover:cursor-pointer"
              onClick={() => window.history.back()}
              type="button"
            >
              <FaAngleLeft />
            </button>

            <div className="mx-4 flex gap-x-5">
              <article className="flex gap-x-2">
                <span>Falta:</span>{" "}
                <p className="text-red-500">
                  {data.filter((p) => p.attendance === "ausente").length}
                </p>
              </article>
              <article className="flex gap-x-2">
                <span>Tardanza:</span>{" "}
                <p className="text-gray-400">
                  {data.filter((p) => p.attendance === "tardanza").length}
                </p>
              </article>
              <article className="flex gap-x-2">
                <span>Justificado:</span>{" "}
                <p className="text-gray-400">
                  {data.filter((p) => p.attendance === "justificado").length}
                </p>
              </article>
              <article className="flex gap-x-2">
                <span>Presente:</span>{" "}
                <p className="text-green-500">
                  {data.filter((p) => p.attendance === "presente").length}
                </p>
              </article>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participante
                  </th>
                  {states.map((state) => (
                    <th
                      key={state}
                      className="px-6 py-3 text-xs text-center font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((participant) => (
                  <tr key={participant.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {participant.name} {participant.lastName}
                    </td>
                    <td colSpan={states.length} className="flex-grow">
                      <Form.Item
                        name={`attendance-${participant.id}`}
                        className="w-full my-auto"
                        rules={[
                          {
                            required: true,
                            message: "Por favor selecciona una opción",
                          },
                        ]}
                      >
                        <Radio.Group
                          className="flex justify-around w-full"
                          onChange={(e) =>
                            handleAttendanceChange(
                              participant.id,
                              e.target.value
                            )
                          }
                          value={participant.attendance}
                          disabled={lock}
                        >
                          {states.map((state) => (
                            <Radio key={state} value={state} />
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center p-4">
            <button
              className={`${
                lock
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } font-medium py-2 px-4 rounded-lg transition`}
              type="submit"
              disabled={lock}
            >
              {lock ? "Asistencia creada" : "Enviar asistencia"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
