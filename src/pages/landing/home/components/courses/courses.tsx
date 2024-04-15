import CustomCard from "../../../../../components/card/card";
import "./courses.css";

import AtletismoIMG from "../../../../../assets/disciplines/Atletismo.jpg";
import BasketIMG from "../../../../../assets/disciplines/Basket.jpg";
import GimnasiaIMG from "../../../../../assets/disciplines/Gimnasia.jpg";
import PatinajeIMG from "../../../../../assets/disciplines/Patinaje.jpg";
import SkateIMG from "../../../../../assets/disciplines/Skate.jpg";
import TennisIMG from "../../../../../assets/disciplines/Tennis.jpg";

export default function Courses() {
  const projects = [
    {
      image: AtletismoIMG,
      title: "Atletismo",
      description:
        "Mejora la condición física y la coordinación mientras te diviertes compitiendo!",
    },
    {
      image: BasketIMG,
      title: "Basquet",
      description:
        "Únete a nosotros para aprender y disfrutar del apasionante mundo del básquetbol.",
    },
    {
      image: GimnasiaIMG,
      title: "Gimnasia",
      description:
        "Aprende a hacer movimientos geniales como volteretas, saltos y balanceos en barras.",
    },
    {
      image: PatinajeIMG,
      title: "Patinaje",
      description:
        "Guiados por instructores expertos, explorarán el mundo sobre ruedas.",
    },
    {
      image: SkateIMG,
      title: "Skateboarding",
      description:
        "Aprende las técnicas básicas de manera divertida y segura con nuestros instructores.",
    },
    {
      image: TennisIMG,
      title: "Tenis",
      description:
        "Sumérgete en la emoción del tenis con nuestra experiencia especializada.",
    },
  ];

  return (
    <div className="w-[80%] m-auto ">
      <div className="mb-12">
        <h1 className="text-2xl lg:text-3xl font-bold mb-3">Disciplinas</h1>
        <p className="leading-6">
          Explora una variedad de disciplinas deportivas para todas las edades y
          niveles de habilidad. Ofrecemos actividades emocionantes diseñadas
          para promover la diversión y el desarrollo físico y mental de nuestros
          participantes. ¡Únete a nosotros para descubrir tu pasión por el
          movimiento!
        </p>
      </div>
      <div className="place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <CustomCard data={project} key={project.title} />
        ))}
      </div>
    </div>
  );
}
