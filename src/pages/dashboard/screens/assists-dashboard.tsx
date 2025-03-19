import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getCoursesByTeacher } from "../../../services/incidents-service";

function AssistsDashboard() {
  const [, setLoading] = useState(false);
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  ); // Estado para la fecha seleccionada

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

  const handleReload = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.userId;
      const response = await getCoursesByTeacher(userId);
      setData(response);
    } catch (error) {
      console.error("Error al cargar los cursos", error);
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    if (data.length === 0) {
      return dayjs().subtract(1, "week").format("YYYY-MM-DD");
    }

    const minDate = data
      .map((course: any) => dayjs(course.startDate))
      .reduce(
        (min, current) => (current.isBefore(min) ? current : min),
        dayjs()
      );

    return minDate.format("YYYY-MM-DD");
  };

  const getCurrentDate = () => {
    return dayjs().format("YYYY-MM-DD");
  };

  const dateFormat = "YYYY-MM-DD";

  return (
    <div className="h-full p-4 max-sm:p-0 ">
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <DatePicker
          value={dayjs(selectedDate, dateFormat)}
          onChange={(date) =>
            setSelectedDate(
              date ? date.format(dateFormat) : dayjs().format(dateFormat)
            )
          }
          minDate={dayjs(getMinDate(), dateFormat)}
          maxDate={dayjs(getCurrentDate(), dateFormat)}
          allowClear={false}
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {data.flatMap((product: any) =>
            product.courses.map((course: any) => (
              <li
                key={`${product.id}-${course.id}`}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2"
              >
                <h3 className="text-gray-900 text-base font-medium max-sm:text-base">
                  {course.name}{" "}
                  <span className="text-sm text-gray-500 max-sm:text-xs">
                    ({product.currentStudents} personas)
                  </span>
                </h3>
                <p className="text-gray-500 text-sm max-sm:hidden">
                  {product.description}
                </p>
                <div className="flex flex-wrap justify-between text-sm text-gray-900">
                  <p>
                    <strong>Inicio:</strong> {product.startDate}
                  </p>
                  <p>
                    <strong>Final:</strong> {product.endDate}
                  </p>
                </div>
                <button
                  className="mt-2 mx-auto w-1/4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
                  onClick={() =>
                    navigate(
                      `/dashboard/assists/${product.id}/course/${course.id}/date/${selectedDate}`
                    )
                  }
                >
                  Ver
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default AssistsDashboard;
