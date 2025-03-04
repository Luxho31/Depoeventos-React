import { Form, Radio } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
// import { useParams } from "react-router-dom";

export default function AssistsDashboardId() {
  // const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState({} as any);

  const states = ["presente", "ausente", "tardanza", "justificado"];

  const participants = [
    { id: 1, name: "Juan Pérez" },
    { id: 2, name: "María Gómez" },
    { id: 3, name: "Carlos Sánchez" },
  ];

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleAttendanceChange = (participantId: any, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [participantId]: value,
    }));
  };

  return (
    <div className="h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Form
          form={form}
          layout="vertical"
          name="attendanceForm"
          initialValues={{}}
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
                  {Object.values(data).filter((v) => v === "ausente").length}
                </p>
              </article>
              <article className="flex gap-x-2">
                <span>Tardanza:</span>{" "}
                <p className="text-gray-400">
                  {Object.values(data).filter((v) => v === "tardanza").length}
                </p>
              </article>
              <article className="flex gap-x-2">
                <span> Justificado:</span>{" "}
                <p className="text-gray-400">
                  {
                    Object.values(data).filter((v) => v === "justificado")
                      .length
                  }
                </p>
              </article>
              <article className="flex gap-x-2">
                <span>Presente:</span>{" "}
                <p className="text-green-500">
                  {Object.values(data).filter((v) => v === "presente").length}
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
                {participants.map((participant) => (
                  <tr key={participant.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {participant.name}
                    </td>
                    <td colSpan={states.length} className="flex-grow ">
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
                          value={data[participant.id]}
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                alert(
                  JSON.stringify(
                    { date: getCurrentDate(), attendance: data },
                    null,
                    2
                  )
                )
              }
            >
              Guardar asistencias
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
