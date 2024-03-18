import "./campuses.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CampusCard from "../../../../../components/campus-card/campus-card";

export default function Campuses({ slide }: any) {
  return (
    <div className="w-[80%] m-auto mb-10 mt-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">Sedes</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {slide.map((item: any) => (
          <SwiperSlide key={item.id}>
            <CampusCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
