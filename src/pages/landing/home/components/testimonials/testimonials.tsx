import { Rating } from "@smastrom/react-rating";
import "./testimonials.css";

import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getAllTestimonialsApproved
} from "../../../../../services/opinions-service";

const TestimonialsData = [
  {
    id: 1,
    fullName: "Diego Cedrón",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis",
    createdAt: "2024-09-01",
    approved: true,
    rating: 2,
  },
  {
    id: 2,
    fullName: "Juan Perez",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis",
    createdAt: "2024-09-01",
    approved: true,
    rating: 3,
  },
  {
    id: 3,
    fullName: "Roberto Rodriguez",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis",
    createdAt: "2024-09-01",
    approved: true,
    rating: 4,
  },
  {
    id: 4,
    fullName: "Enrique Gonzales",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis, consectetur adipisicing elit.",
    createdAt: "2024-09-01",
    approved: true,
    rating: 1,
  },
];

const Slide = ({ item }: { item: any }) => {
  return (
    <div className="w-full select-none h-[300px] bg-white rounded-lg p-6 flex flex-col items-center border border-gray-300 shadow shadow-orange-300 hover:shadow-md hover:shadow-orange-500 transition-shadow duration-300 ease-in-out">
      {/* Rating */}
      <div className="mb-4">
        <Rating value={item.rating} readOnly style={{ maxWidth: 120 }} />
      </div>

      {/* Name and Date */}
      <p className="text-xl font-semibold text-gray-800 mb-2">
        {item.fullName}
      </p>
      <p className="text-sm text-gray-500 mb-4">{item.createdAt}</p>

      {/* Testimonial */}
      <p className="text-sm text-gray-600 text-center">"{item.testimonial}"</p>
      <p className="text-xs text-gray-400 text-center mt-4">Depoeventos</p>
    </div>
  );
};

export default function Testimonials() {
  // const [testimonials, setTestimonials] = useState(TestimonialsData);
  const [, setTestimonials] = useState(TestimonialsData);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await getAllTestimonialsApproved();
      const data = await response.json();
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);
  return (
    <div className="w-full">
      <div className="w-[80%] m-auto mb-10 mt-20">
        <div className="mb-12">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">Testimonios</h1>
          <p className="leading-6 text-justify">
            Contamos con instructores especializados que, con su experiencia y
            pasión, te guiarán en el aprendizaje y dominio de diversas
            disciplinas deportivas. Descubre lo que nuestros estudiantes y
            padres tienen para decir sobre su experiencia con nosotros.
          </p>
        </div>
        <Swiper
          modules={[Navigation, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              autoplay: {
                delay: 6500,
                disableOnInteraction: false,
              },
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {TestimonialsData.map((item) => (
            <SwiperSlide key={item.id} className="p-4">
              <Slide key={item.id} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
