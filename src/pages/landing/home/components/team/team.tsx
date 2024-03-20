import { InfiniteMovingCards } from "../../../../../components/infinite-moving-cards";

import LuisCarpioIMG from "../../../../../assets/teachers/PROF._FUTBOL_SP_-_LUIS_CARPIO-removebg-preview.png";
import MiguelParedesIMG from "../../../../../assets/teachers/PROF._FUT_SP_-_MIGUEL_PAREDES-removebg-preview.png";
import FernandoCamposIMG from "../../../../../assets/teachers/PROF_BASQUET_VC_-_FERNANDO_CAMPOS-removebg-preview.png";
import AngelAponteIMG from "../../../../../assets/teachers/PROF_GIMNASIA_VC_-_ANGEL_ALBERTO_APONTE_ZAPATA-removebg-preview.png";
import VirginiaMoraIMG from "../../../../../assets/teachers/PROF_GIMNASIA_VC_-_VIRGINIA_AMERICA_MORA_TUANAMA-removebg-preview.png";
import MartinRodriguezIMG from "../../../../../assets/teachers/Prof. Martin Rodriguez Futbol VC.png";
import OscarGuevaraIMG from "../../../../../assets/teachers/Prof.Functional_SPVC_y_Baile_PPFF-__Oscar_Guevara-removebg-preview.png";
import AngeloCamposIMG from "../../../../../assets/teachers/Prof._Angelo_Campos_-_Skateboarding_SPVC-removebg-preview.png";
import CesarCamposIMG from "../../../../../assets/teachers/Prof._Cesar_Campos_-_Patinaje_VC-removebg-preview.png";
import EduardoDiosesIMG from "../../../../../assets/teachers/Prof._Eduardo_Dioses_-_Basquet_SP-removebg-preview.png";
import EdwinCondezoIMG from "../../../../../assets/teachers/Prof._Edwin_Condezo_-_Atletismo_SPVC-removebg-preview.png";
import JesusHuaracaIMG from "../../../../../assets/teachers/Prof._Jesus_Huaraca_-_Tenis_de_Campo_SVPC-removebg-preview.png";
import JesusPaucarcajaIMG from "../../../../../assets/teachers/Prof._Jesus_Paucarcaja_-_Karate_SPVC-removebg-preview.png";
import JoseIMG from "../../../../../assets/teachers/Prof._Jose_-_Karate_SPVC-removebg-preview.png";
import PercyCelisIMG from "../../../../../assets/teachers/Prof._Percy_Celis_-_Futbol_SP-removebg-preview.png";

export default function Team() {
  const testimonials1 = [
    {
      name: "Prof. Fernando Campos - Basquet",
      img: FernandoCamposIMG,
    },
    {
      name: "Prof. Angel Aponte - Gimnasia",
      img: AngelAponteIMG,
    },
    {
      name: "Prof. Virginia Mora - Gimnasia",
      img: VirginiaMoraIMG,
    },
    {
      name: "Prof. Martin Rodriguez - Fútbol",
      img: MartinRodriguezIMG,
    },
    {
      name: "Prof. Angelo Campos - Skateboarding",
      img: AngeloCamposIMG,
    },
    {
      name: "Prof. Cesar Campos - Patinaje",
      img: CesarCamposIMG,
    },
    {
      name: "Prof. Eduardo Dioses - Basquet",
      img: EduardoDiosesIMG,
    },
    {
      name: "Prof. Edwin Condezo - Atletismo",
      img: EdwinCondezoIMG,
    },
  ];

  const testimonials2 = [
    {
      name: "Prof. Miguel Paredes - Fútbol",
      img: MiguelParedesIMG,
    },
    {
      name: "Prof. Luis Carpio - Fútbol",
      img: LuisCarpioIMG,
    },
    {
      name: "Prof. Jesus Huaraca - Tenis de Campo",
      img: JesusHuaracaIMG,
    },
    {
      name: "Prof. Jesus Paucarcaja - Karate",
      img: JesusPaucarcajaIMG,
    },
    {
      name: "Prof. Jose - Karate",
      img: JoseIMG,
    },
    {
      name: "Prof. Percy Celis - Fútbol",
      img: PercyCelisIMG,
    },
    {
      name: "Prof. Oscar Guevara - Functional & Baile",
      img: OscarGuevaraIMG,
    },
  ];

  return (
    <div className="w-[80%] m-auto mt-20 mb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">Equipo</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
      </div>
      <div className="w-full m-auto flex flex-col justify-around max-xl:w-full max-lg:flex-col max-lg:items-center max-lg:gap-10">
        <InfiniteMovingCards items={testimonials1} direction="right" />
        <InfiniteMovingCards items={testimonials2} direction="left" />
      </div>
    </div>
  );
}
