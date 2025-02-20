import { Button, Divider, Select } from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const courses = [
  {
    id: 1,
    name: "Curso 1",
    children: [
      { id: 1, name: "Curso1A" },
      { id: 2, name: "Curso1B" },
    ],
  },
  {
    id: 2,
    name: "Curso 2",
    children: [
      { id: 3, name: "Curso2A" },
      { id: 4, name: "Curso2B" },
      { id: 13, name: "Curso2A" },
      { id: 14, name: "Curso2B" },
      { id: 33, name: "Curso2A" },
      { id: 34, name: "Curso2B" },
    ],
  },
  {
    id: 3,
    name: "Curso 3",
    children: [
      { id: 5, name: "Curso3A" },
      { id: 6, name: "Curso3B" },
    ],
  },
  {
    id: 4,
    name: "Curso 4",
    children: [
      { id: 7, name: "Curso4A" },
      { id: 8, name: "Curso4B" },
    ],
  },
];

function CoursesWithChildrenDashboard() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const specificRole = "ADMIN";

  const [selectedCourse1, setSelectedCourse1] = useState<number | null>(null);
  const [selectedCourse2, setSelectedCourse2] = useState<number | null>(null);
  const [leftList, setLeftList] = useState<{ id: number; name: string }[]>([]);
  const [rightList, setRightList] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedLeft, setSelectedLeft] = useState<number[]>([]);
  const [selectedRight, setSelectedRight] = useState<number[]>([]);

  useEffect(() => {
    if (userRole && userRole.includes(specificRole)) return;
    navigate("/dashboard");
  }, [userRole]);

  const handleCourseChange = (courseId: number | null, isLeft: boolean) => {
    if (isLeft) {
      setSelectedCourse1(courseId);
      const course = courses.find((c) => c.id === courseId);
      setLeftList(course ? course.children : []);
      setSelectedLeft([]);
    } else {
      setSelectedCourse2(courseId);
      const course = courses.find((c) => c.id === courseId);
      setRightList(course ? course.children : []);
      setSelectedRight([]);
    }
  };

  const toggleSelection = (id: number, isLeft: boolean) => {
    if (isLeft) {
      setSelectedLeft((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      setSelectedRight((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const moveItems = (isToRight: boolean) => {
    if (!selectedCourse1 || !selectedCourse2) return;
    if (isToRight) {
      const itemsToMove = leftList.filter((item) =>
        selectedLeft.includes(item.id)
      );
      setRightList([...rightList, ...itemsToMove]);
      setLeftList(leftList.filter((item) => !selectedLeft.includes(item.id)));
      setSelectedLeft([]);
    } else {
      const itemsToMove = rightList.filter((item) =>
        selectedRight.includes(item.id)
      );
      setLeftList([...leftList, ...itemsToMove]);
      setRightList(
        rightList.filter((item) => !selectedRight.includes(item.id))
      );
      setSelectedRight([]);
    }
  };

  return (
    <div className="h-full p-6 rounded-lg shadow-lg">
      <div className="flex justify-center items-center gap-x-6 mb-4">
        <Select
          placeholder="Selecciona Curso 1"
          value={selectedCourse1}
          onChange={(value) => handleCourseChange(value, true)}
          className="w-52"
        >
          {courses.map((course) => (
            <Select.Option
              key={course.id}
              value={course.id}
              disabled={course.id === selectedCourse2}
            >
              {course.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Selecciona Curso 2"
          value={selectedCourse2}
          onChange={(value) => handleCourseChange(value, false)}
          className="w-52"
        >
          {courses.map((course) => (
            <Select.Option
              key={course.id}
              value={course.id}
              disabled={course.id === selectedCourse1}
            >
              {course.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Divider />

      <div className="flex justify-center items-center gap-x-8">
        <div className="w-96">
          <h3 className="text-center font-bold text-lg">
            Curso {selectedCourse1 || "1"}
          </h3>
          <ul className="border border-gray-300 bg-white p-4 rounded-lg min-h-[150px] shadow-md">
            {leftList.map((child) => (
              <li
                key={child.id}
                className={`cursor-pointer my-1 p-2 rounded-lg text-center text-gray-700 ${
                  selectedLeft.includes(child.id)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => toggleSelection(child.id, true)}
              >
                {child.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => moveItems(true)}
            disabled={
              selectedLeft.length === 0 || !selectedCourse1 || !selectedCourse2
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300"
          >
            <FaArrowRight />
          </Button>
          <Button
            onClick={() => moveItems(false)}
            disabled={
              selectedRight.length === 0 || !selectedCourse1 || !selectedCourse2
            }
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-300"
          >
            <FaArrowLeft />
          </Button>
        </div>

        {/* Lista Derecha */}
        <div className="w-96 ">
          <h3 className="text-center font-bold text-lg">
            Curso {selectedCourse2 || "2"}
          </h3>
          <ul className="border border-gray-300 bg-white p-4 rounded-lg min-h-[150px] overflow-auto shadow-md">
            {rightList.map((child) => (
              <li
                key={child.id}
                className={`cursor-pointer p-2 rounded-lg text-center text-gray-700 ${
                  selectedRight.includes(child.id)
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => toggleSelection(child.id, false)}
              >
                {child.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CoursesWithChildrenDashboard;
