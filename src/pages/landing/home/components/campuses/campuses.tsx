import "./campuses.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
    A11y,
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CampusCard from "../../../../../components/campus-card/campus-card";

type SlideItem = {
  id: number;
  direction: string;
  title: string;
  description: string;
  logo: string;
  image: string;
};

type SlideData = SlideItem[];

export default function Campuses({ slide }: { slide: SlideData }) {
    return (
        <div className="w-[80%] m-auto mb-10 mt-20">
            <div className="mb-12">
                <h1 className="text-2xl lg:text-4xl font-extrabold mb-3">Sedes</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
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
                {slide.map((item: SlideItem) => (
                    <SwiperSlide key={item.id}>
                        <CampusCard
                            id={item.id}
                            direction={item.direction}
                            title={item.title}
                            description={item.description}
                            logo={item.logo}
                            image={item.image}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
