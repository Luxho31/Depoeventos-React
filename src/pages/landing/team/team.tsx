import "animate.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
	Autoplay
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Team() {
	return (
		<div className="h-screen pt-16">
			<div className="flex flex-col items-center justify-center h-[30%]">
				<h1 className="text-4xl font-bold pb-1">Conoce a nuestro equipo</h1>
				<p className="text-lg+">
					Our team is composed of the best of the best. We are a group of
					passionate individuals who are dedicated to providing the best service
					to our clients.
				</p>
			</div>
			<div className="h-[70%] flex items-center justify-center">
				<Swiper
					slidesPerView={5}
					spaceBetween={5}
					modules={[Autoplay]}
					autoplay={{
						delay: 1000,
						disableOnInteraction: true,
					}}
					loop={true}
					effect="coverflow"
					noSwipingClass="swiper-no-swiping"
				>
					{Array.from({ length: 20 }).map((_, index) => (
						<SwiperSlide key={index} className="h-full p-3">
							<img
								src="https://st3.depositphotos.com/13324256/17675/i/600/depositphotos_176758222-stock-photo-beautiful-gerbera-flower-isolated-black.jpg"
								alt=""
								className="!h-[23rem] !w-[19rem] object-cover rounded-3xl shadow-lg hover:scale-105 transition duration-300 ease-in-out "
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
