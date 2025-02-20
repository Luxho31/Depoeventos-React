import { Divider, Select, Transfer } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const courses = [
  {
    id: 1,
    name: "Curso 1",
    children: [
      { id: 1, name: "Curso1" },
      { id: 2, name: "Curso1" },
    ],
  },
  {
    id: 2,
    name: "Curso 2",
    children: [
      { id: 3, name: "Curso2" },
      { id: 4, name: "Curso2" },
    ],
  },
  {
    id: 3,
    name: "Curso 3",
    children: [
      { id: 5, name: "Curso3" },
      { id: 6, name: "Curso3" },
    ],
  },
  {
    id: 4,
    name: "Curso 4",
    children: [
      { id: 7, name: "Curso4" },
      { id: 8, name: "Curso4" },
    ],
  },
];

function CoursesWithChildrenDashboard() {
  const [, setLoading] = useState(false);
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const specificRole = "ADMIN";

  const [selectedCourse1, setSelectedCourse1] = useState<number | null>(null);
  const [selectedCourse2, setSelectedCourse2] = useState<number | null>(null);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (userRole && userRole.some((role) => role === specificRole)) {
      handleReload();
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  const handleReload = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.error("Error al cargar los cursos", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredChildren = () => {
    const sourceChildren = selectedCourse1
      ? courses.find((c) => c.id === selectedCourse1)?.children || []
      : [];
    const targetChildren = selectedCourse2
      ? courses.find((c) => c.id === selectedCourse2)?.children || []
      : [];

    const allChildren = [
      ...sourceChildren.map((child) => ({
        key: `${child.id}`,
        title: child.name,
        courseId: selectedCourse1,
      })),
      ...targetChildren.map((child) => ({
        key: `${child.id}`,
        title: child.name,
        courseId: selectedCourse2,
      })),
    ];

    return allChildren;
  };

  useEffect(() => {
    const targetChildrenKeys = selectedCourse2
      ? courses
          .find((c) => c.id === selectedCourse2)
          ?.children.map((child) => `${child.id}`) || []
      : [];

    setTargetKeys(targetChildrenKeys);
  }, [selectedCourse1, selectedCourse2]);

  const dataSource = getFilteredChildren();

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div className="h-full p-4 max-sm:p-0">
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        {/* Selectores de Cursos */}
        <div className="w-full flex justify-center items-center gap-x-10">
          <Select
            placeholder="Selecciona Curso 1"
            value={selectedCourse1}
            onChange={(value) => setSelectedCourse1(value)}
            style={{ width: 200 }}
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
            onChange={(value) => setSelectedCourse2(value)}
            style={{ width: 200 }}
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

        <Transfer
          dataSource={dataSource}
          titles={[
            selectedCourse1 ? `Curso ${selectedCourse1}` : "Lista 1",
            selectedCourse2 ? `Curso ${selectedCourse2}` : "Lista 2",
          ]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          render={(item) => item.title}
        />
      </div>
    </div>
  );
}

export default CoursesWithChildrenDashboard;
