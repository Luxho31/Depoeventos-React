import Courses from "./components/courses/courses";
import Campuses from "./components/campuses/campuses";
import Intro from "./components/intro/intro";
import Packages from "./components/products/products";
import { FloatButton } from "antd";
export default function Home() {
  const data = [
    {
      id: 1,
      direction: "La Molina, Lima, Perú",
      title: "Colegio San Pedro",
      description:
        "Ubicado en una comunidad vibrante, el Colegio San Pedro se destaca por ofrecer una educación integral que nutre el intelecto y el espíritu. Con instalaciones modernas y un compromiso con la excelencia académica, nuestro colegio es un lugar donde los estudiantes florecen y se preparan para enfrentar los desafíos del mundo con confianza y ética.",
      logo: "https://educacionalfuturo.com/wp-content/uploads/2018/08/Logo-SP.png",
      image: "https://www.colsanpedro.com/imagenes/DSC_0014.jpg",
    },
    {
      id: 2,
      direction: "La Molina, Lima, Perú",
      title: "Colegio Villa Caritas",
      description:
        "En el corazón de la encantadora Villa Caritas, nuestro colegio es un faro de aprendizaje y desarrollo personal. Con un enfoque centrado en los valores y una comunidad educativa acogedora, el Colegio Villa Caritas se esfuerza por inspirar la curiosidad intelectual y fomentar habilidades para la vida en un ambiente enriquecedor y estimulante",
      logo: "https://educacionalfuturo.com/wp-content/uploads/2018/08/Logo-SP.png",
      image: "https://villacaritas.vc-sp.edu.pe/wp-content/uploads/2023/11/IMG_0942.jpg",
    },
    {
      id: 3,
      direction: "Santiago de surco, Lima, Perú",
      title: "Club Palestino-Árabe",
      description:
        "El Club Palestino-Árabe es más que un lugar de encuentro, es una comunidad que celebra la rica herencia cultural y promueve la amistad entre personas de diversas raíces. Con instalaciones deportivas de primera clase y eventos culturales emocionantes, el club es un espacio donde la diversidad se une para compartir experiencias, fortalecer lazos y construir un futuro inclusivo.",
      logo: "https://educacionalfuturo.com/wp-content/uploads/2018/08/Logo-SP.png",
      image: "https://lh3.googleusercontent.com/p/AF1QipO_OSnM0VTjKCto34IOUe2B6e-KBSbJELJs_v6X=s680-w680-h510",
    },
  ];
  return (
    <>
      <div className="mt-12">
        <Intro />
        <Courses />
        <Packages />
        <Campuses slide={data} />
        <FloatButton.BackTop />
      </div>
    </>
  );
}
