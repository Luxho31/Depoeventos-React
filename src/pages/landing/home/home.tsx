import { FloatButton } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import PalestinoArabeIMG from "../../../assets/campuses/club-palestino-arabe.png";
import SanJoseMaristasIMG from "../../../assets/campuses/san-jose-maristas.jpeg";
import VillaCaritasIMG from "../../../assets/campuses/villa-caritas.jpg";
import Campuses from "./components/campuses/campuses";
import Courses from "./components/courses/courses";
import Intro from "./components/intro/intro";
import Team from "./components/team/team";
import Testimonials from "./components/testimonials/testimonials";

export default function Home() {
  const data = [
    {
      id: 1,
      direction: "La Molina, Lima, Perú",
      title: "Colegio San Pedro",
      description:
        "Somos una comunidad educativa católica que forma parte de la Familia Sodálite. Ofrecemos una sólida formación personalizada e integral. Trabajamos en conjunto con la familia, ofreciendo a nuestros alumnos una experiencia educativa diferenciada con espacios de coeducación y altos estándares académicos en un ambiente bilingüe. ",
      logo: "https://educacionalfuturo.com/wp-content/uploads/2018/08/Logo-SP.png",
      image:
        "https://sanpedro.vc-sp.edu.pe/wp-content/uploads/2023/11/SP-INICIO-CABECERA-02-scaled.jpg",
    },
    {
      id: 2,
      direction: "La Molina, Lima, Perú",
      title: "Colegio Villa Caritas",
      description:
        "Somos una comunidad educativa católica que forma parte de la Familia Sodálite. Ofrecemos una sólida formación personalizada e integral. Trabajamos en conjunto con la familia, ofreciendo a nuestras alumnas una experiencia educativa diferenciada con espacios de coeducación y altos estándares académicos en un ambiente bilingüe.",
      logo: VillaCaritasIMG,
      image:
        "https://villacaritas.vc-sp.edu.pe/wp-content/uploads/2023/11/IMG_0942.jpg",
    },

    {
      id: 3,
      direction: "Callao, Perú",
      title: "Colegio San José Hermanos Maristas",
      description:
        "El Colegio San José Hermanos Maristas del Callao es una comunidad educativa católica que forma integralmente a niños y jóvenes, guiados por los valores evangélicos. Siguiendo el carisma de San Marcelino Champagnat, armonizamos fe, cultura y vida, con una metodología innovadora y la pedagogía de la presencia, buscando siempre educar con amor y dedicación.",

      logo: SanJoseMaristasIMG,
      image:
        "https://www.sanjosemaristas.edu.pe/assets/AP-eucaristia2-DTDCSVvr.webp",
    },
    {
      id: 4,
      direction: "Santiago de surco, Lima, Perú",
      title: "Club Palestino-Árabe",
      description:
        "El Club Palestino-Árabe es más que un lugar de encuentro, es una comunidad que celebra la rica herencia cultural y promueve la amistad entre personas de diversas raíces. Con instalaciones deportivas de primera clase y eventos culturales emocionantes, el club es un espacio donde la diversidad se une para compartir experiencias, fortalecer lazos y construir un futuro inclusivo.",
      logo: PalestinoArabeIMG,
      image:
        "https://lh3.googleusercontent.com/p/AF1QipO_OSnM0VTjKCto34IOUe2B6e-KBSbJELJs_v6X=s680-w680-h510",
    },
  ];
  return (
    <>
      <div className="mt-12">
        <Intro />
        <Courses />
        <Campuses slide={data} />
        <Testimonials />
        <Team />
        <FloatButton.Group shape="circle" className="space-y-2">
          <a
            href="https://wa.me/+51989687478"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FloatButton icon={<FaWhatsapp />} />
          </a>
          <FloatButton.BackTop />
        </FloatButton.Group>
      </div>
    </>
  );
}
