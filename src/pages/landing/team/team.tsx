import "animate.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { InfiniteMovingCards } from "../../../components/infinite-moving-cards";
import TennisIMG from "../../../assets/disciplines/Tennis.jpg"


export default function Team() {
  const testimonials = [
    {
      name: "Charles Dickens",
      img: TennisIMG
    },
    {
      name: "William Shakespeare",
      img: TennisIMG

    },
    {
      name: "Edgar Allan Poe",
      img: TennisIMG

    },
    {
      name: "Jane Austen",
      img: TennisIMG

    },
    {
      name: "Herman Melville",
      img: "https://w0.peakpx.com/wallpaper/58/22/HD-wallpaper-spider-man-game-art-vertical-artwork-comic-art-portrait-display-marvel-super-heroes.jpg"
    },
  ];

  return (
    <div className="h-screen pt-5">
      <div className="flex flex-col items-center justify-center h-[30%]">
        <h1 className="text-4xl font-bold">Conoce a nuestro equipo</h1>
        <p className="text-lg">
          Our team is composed of the best of the best. We are a group of
          passionate individuals who are dedicated to providing the best service
          to our clients.
        </p>
      </div>
      <div className="h-[70%] flex items-center justify-center flex-col gap-y-4">
        <InfiniteMovingCards items={testimonials} direction="right" />
        <InfiniteMovingCards items={testimonials} direction="left" />
      </div>
    </div>
  );
}
