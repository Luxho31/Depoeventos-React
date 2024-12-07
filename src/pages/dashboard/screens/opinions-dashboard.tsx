import { Rating } from "@smastrom/react-rating";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import {
  getAllTestimonials,
  updateTestimonialApproval,
} from "../../../services/opinions-service";

function TestimonialDashboard() {
  const [testimonialData, setTestimonialData] = useState<any[]>([
    {
      id: 1,
      fullName: "Erika Julissa Serrano Rengifo",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. kajsldkajsldkjsaldkjasldkjsaldkjsaldkjsadkjaslkdjlsakjdlsakj",
      rating: 5,
      createdAt: "2021-09-01",
      approved: true,
    },
    {
      id: 2,
      fullName: "Diego Alonso Cedrón Serrano",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies. kajsldkajsldkjsaldkjasldkjsaldkjsaldkjsadkjaslkdjlsakjdlsakj",
      rating: 1,
      createdAt: "2021-09-01",
      approved: false,
    },
  ]);
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
      const response = await getAllTestimonials();
      const data = await response.json();
      setTestimonialData(data);
    } catch (error) {
      console.error("Error al cargar los testimonios:", error);
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="w-fit">
                <th scope="col" className="px-6 py-3 w-fit">
                  Usuario
                </th>
                <th scope="col" className="px-2 py-3 w-fit">
                  Testimonio
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Aprobado
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {testimonialData.map((testimonial, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 w-1/8">{testimonial.fullName}</td>
                  <td className="px-2 py-4 w-1/2">{testimonial.testimonial}</td>
                  <td className="px-6 py-4">
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={testimonial.rating}
                      readOnly={true}
                    />
                  </td>
                  <td className="px-6 py-4">{testimonial.createdAt}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      testimonial.approved ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {testimonial.approved ? "Si" : "No"}
                  </td>
                  <td className="h-full flex mt-6 items-center justify-center gap-x-3">
                    <button
                      className="bg-green-500 text-white rounded-md px-2 py-1"
                      onClick={() => {
                        updateTestimonialApproval(testimonial.id);
                        handleReload();
                      }}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-md px-2 py-1"
                      onClick={() => {
                        updateTestimonialApproval(testimonial.id);
                        handleReload();
                      }}
                    >
                      <IoMdClose />
                    </button>
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
        total={testimonialData.length}
        pageSize={10}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default TestimonialDashboard;
