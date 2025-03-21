import { Button, Divider, Select, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useAuth } from "../../../context/AuthProvider";
import {
  getAllActiveProducts,
  getChildrenByProduct,
} from "../../../services/products-service";
import { changeChildrenCourse } from "../../../services/Inscriptions-service";

function CoursesWithChildrenDashboard() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const specificRole = "ADMIN";
  const [otp, setOtp] = useState("");
  const [validOtp, setValidOtp] = useState(false);
  const [selectedCourse1, setSelectedCourse1] = useState<number | null>(null);
  const [selectedCourse2, setSelectedCourse2] = useState<number | null>(null);
  const [leftList, setLeftList] = useState<{ id: number; name: string }[]>([]);
  const [rightList, setRightList] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedLeft, setSelectedLeft] = useState<number[]>([]);
  const [selectedRight, setSelectedRight] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [mobileSize, setMobileSize] = useState(false);
  useEffect(() => {
    if (userRole && userRole.includes(specificRole)) return;
    navigate("/dashboard");
  }, [userRole]);

  useEffect(() => {
    getActiveProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setMobileSize(true);
        console.log("Mobile size");
      } else {
        setMobileSize(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCourseChange = async (courseId: any | null, isLeft: boolean) => {
    if (isLeft) {
      setSelectedCourse1(courseId);
      await getChildrenByProduct(courseId).then((res) => {
        setLeftList(res);
        console.log("Lista izquierda original: ", res);
      });
      setSelectedLeft([]);
    } else {
      setSelectedCourse2(courseId);
      await getChildrenByProduct(courseId).then((res) => {
        setRightList(res);
        console.log("Lista derecha original: ", res);
      });
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

  const getActiveProducts = async () => {
    const products = await getAllActiveProducts();
    console.log("Productos activos:", products);
    setProducts(products);
  };

  const handleSaveChanges = async () => {
    const leftListIds = leftList.map((item) => item.id);
    const rightListIds = rightList.map((item) => item.id);
    console.log("Lista izquierda final: ", leftListIds);
    console.log("Lista derecha final: ", rightListIds);
    const body = {
      product1: selectedCourse1,
      product2: selectedCourse2,
      children1: leftListIds,
      children2: rightListIds,
    };

    await changeChildrenCourse(body);
    toast.info(
      "Cambios realizados con éxito. Los alumnos han sido transferidos",
      {
        duration: 5000,
        description: `Los alumnos han sido transferidos del curso ${selectedCourse1} al curso ${selectedCourse2}`,
      }
    );
    setSelectedCourse1(null);
    setSelectedCourse2(null);
    setLeftList([]);
    setRightList([]);

    setSelectedLeft([]);
    setSelectedRight([]);
  };

  const OTP_PASSWORD = "260601";

  const getKeyRandom = () => {
    return Math.floor(Math.random() * 1000000);
  };

  return (
    <>
      <Toaster richColors />
      {!validOtp && !mobileSize && (
        <div className="w-full h-full flex justify-center items-center">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 w-full max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-semibold text-gray-800">
              Transferencia de alumnos
            </h1>
            <p className="text-lg text-gray-500">Ingresa la contraseña OTP</p>

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-1 text-gray-500">-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "1.8rem",
                height: "1.8rem",
                fontSize: "1.2rem",
                margin: "0 0.4rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />

            <motion.button
              onClick={() => {
                if (!otp) {
                  toast.error("Ingresa la contraseña OTP");
                  return;
                }
                if (otp === OTP_PASSWORD) {
                  toast.success("OTP Correcto");
                  setValidOtp(true);
                } else {
                  toast.error("OTP Incorrecto");
                  setOtp("");
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              aria-label="Ingresar con OTP"
            >
              Ingresar
            </motion.button>
          </motion.div>
        </div>
      )}
      {mobileSize && (
        <div className="w-full h-full flex flex-col justify-center items-center text-center">
          <h1
            className="text-2xl font-semibold text-gray-800"
            style={{ maxWidth: "300px" }}
          >
            Esta funcionalidad no está disponible en dispositivos móviles
          </h1>
          <p className="text-gray-500">
            Por favor, ingresa desde un dispositivo con una pantalla más grande
          </p>
        </div>
      )}
      {validOtp && (
        <div className="h-full p-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center gap-x-6 mb-4">
            <Select
              placeholder="Selecciona Curso 1"
              value={selectedCourse1}
              onChange={(value) => handleCourseChange(value, true)}
              className="w-full"
            >
              {products.map((product) => (
                <Select.Option
                  key={product.id + getKeyRandom()}
                  value={product.id}
                  disabled={product.id === selectedCourse2}
                >
                  {product.name} - {product.gender} -{" "}
                  {product.grades.map((grade: number) => (
                    <span key={grade}>{grade} </span>
                  ))}
                  -{" "}
                  {product.campus.map((campus: any) => (
                    <span key={campus.id}>{campus.name} </span>
                  ))}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="Selecciona Curso 2"
              value={selectedCourse2}
              onChange={(value) => handleCourseChange(value, false)}
              className="w-full"
            >
              {products.map((product) => (
                <Select.Option
                  key={product.id + getKeyRandom()}
                  value={product.id}
                  disabled={product.id === selectedCourse1}
                >
                  {product.name} - {product.gender} -{" "}
                  {product.grades.map((grade: number) => (
                    <span key={grade}>{grade} </span>
                  ))}
                  -{" "}
                  {product.campus.map((campus: any) => (
                    <span key={campus.id}>{campus.name} </span>
                  ))}
                </Select.Option>
              ))}
            </Select>
            <button
              onClick={() => {
                setOtp("");
                setValidOtp(false);
              }}
              className="hover:text-red-500 transition-colors"
            >
              <Tooltip title="Bloquear" placement="right">
                <TbLock />
              </Tooltip>
            </button>
          </div>

          <Divider />

          <div className="flex justify-center items-center gap-x-8">
            <div className="w-96">
              <h3 className="text-center font-bold text-lg">
                Curso {selectedCourse1 || "1"}
              </h3>
              <ul className="border border-gray-300 bg-white p-4 rounded-lg min-h-[150px] max-h-[300px] overflow-auto shadow-md">
                {leftList.map((child: any) => (
                  <li
                    key={child.id}
                    className={`cursor-pointer my-1 p-2 rounded-lg text-center text-gray-700 ${
                      selectedLeft.includes(child.id)
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => toggleSelection(child.id, true)}
                  >
                    {child.name} {child.lastName}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => moveItems(true)}
                disabled={
                  selectedLeft.length === 0 ||
                  !selectedCourse1 ||
                  !selectedCourse2
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300"
              >
                <FaArrowRight />
              </Button>
              <Button
                onClick={() => moveItems(false)}
                disabled={
                  selectedRight.length === 0 ||
                  !selectedCourse1 ||
                  !selectedCourse2
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
              <ul className="border border-gray-300 bg-white p-4 rounded-lg min-h-[150px] max-h-[300px] overflow-auto shadow-md">
                {rightList.map((child: any) => (
                  <li
                    key={child.id}
                    className={`cursor-pointer my-1 p-2 rounded-lg text-center text-gray-700 ${
                      selectedRight.includes(child.id)
                        ? "bg-green-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => toggleSelection(child.id, false)}
                  >
                    {child.name} {child.lastName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="flex justify-center items-center gap-x-4"
            style={{ marginTop: "1rem" }}
          >
            <button
              onClick={handleSaveChanges}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
            >
              Confirmar cambios
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CoursesWithChildrenDashboard;
