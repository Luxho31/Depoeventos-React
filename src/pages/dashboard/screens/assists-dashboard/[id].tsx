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
  const { id, date, course_id }: any = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState([] as any[]);
  const [participants, setParticipants] = useState([] as any[]);
  const [lock, setLock] = useState(false);
  const [loading, setLoading] = useState(true);

  const states = ["presente", "ausente", "tardanza", "justificado"];

  useEffect(() => {
    loadInitialData();
  }, [date, course_id]);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      const fetchedParticipants = await getChildrenByProduct(id);
      setParticipants(fetchedParticipants);

      const assists = await getAssistsByDateAndCourseHandler(
        id,
        date,
        course_id
      );

      if (assists && assists.assists.length > 0) {
        const updatedParticipants = fetchedParticipants.map(
          (participant: any) => {
            const existingAssist = assists.assists.find(
              (a: any) => a.childrenId === participant.id
            );
            return {
              ...participant,
              attendance: existingAssist ? existingAssist.state : undefined,
            };
          }
        );

        setData(updatedParticipants);
        setLock(true);
      } else {
        if (fetchedParticipants.length > 0) {
          setData(
            fetchedParticipants.map((p: any) => ({
              ...p,
              attendance: undefined,
            }))
          );
          setLock(false);
        } else {
          setData([]);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos iniciales", error);
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (participantId: number, value: string) => {
    setData((prevData) =>
      prevData.map((participant) =>
        participant.id === participantId
          ? { ...participant, attendance: value }
          : participant
      )
    );
  };

  const handleSendAssists = async (values: any) => {
    const body = {
      date,
      productId: id,
      courseId: course_id,
      assists: data.map((participant) => ({
        childrenId: participant.id,
        state: values[`attendance-${participant.id}`],
      })),
    };

    try {
      await createAssist(body);
      toast.success("Asistencia creada correctamente");
      setLock(true);
      loadInitialData();
    } catch (error) {
      console.error("Error al crear asistencia", error);
      toast.error("Error al crear asistencia");
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">Cargando datos...</p>
      </div>
    );
  }

  if (participants.length === 0) {
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
          No hay participantes disponibles en este curso.
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
              <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
                {data.map((participant) => (
                  <tr key={participant.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {participant.name} {participant.lastName}
                    </td>
                    <td colSpan={states.length} className="flex-grow">
                      <Form.Item
                        name={`attendance-${participant.id}`}
                        className="w-full my-auto"
                        initialValue={participant.attendance}
                      >
                        <Radio.Group
                          className="flex justify-around w-full"
                          onChange={(e) =>
                            handleAttendanceChange(
                              participant.id,
                              e.target.value
                            )
                          }
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
          <div className="w-full flex items-center mb-4">
            <button
              type="submit"
              disabled={lock}
              className={`mt-4 ${
                lock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-medium py-2 px-4 rounded-lg transition mx-auto`}
            >
              {lock ? "Asistencia creada" : "Enviar asistencia"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
