import "./testimonials.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TestimonialsData = [
  {
    id: 1,
    fullName: "Diego Cedrón",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis",
    createdAt: "2024-09-01",
    approved: true,
    rating: 1,
  },
  {
    id: 2,
    fullName: "Juan Perez",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis",
    createdAt: "2024-09-01",
    approved: true,
    rating: 1,
  },
  {
    id: 3,
    fullName: "Roberto Rodriguez",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis",
    createdAt: "2024-09-01",
    approved: true,
    rating: 1,
  },
  {
    id: 4,
    fullName: "Enrique Gonzales",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda fuga veritatis",
    createdAt: "2024-09-01",
    approved: true,
    rating: 1,
  },
];

const Slide = ({ item }: { item: any }) => {
  return (
    <div className="w-full h-[400px] bg-gray-200 rounded-lg p-5">
      <p>
        {item.fullName} - {item.createdAt}
      </p>
    </div>
  );
};

export default function Testimonials() {
  return (
    <div className="w-full">
      <div className="w-[80%] m-auto mb-10 mt-20">
        <div className="mb-12">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">Testimonios</h1>
          <p className="leading-6 text-justify">
            Nuestros alumnos y padres de familia nos recomiendan.
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
              }
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
            <SwiperSlide key={item.id}>
              <Slide key={item.id} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
