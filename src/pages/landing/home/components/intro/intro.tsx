import "animate.css";
import "./intro.css";
import FotoPrincipal from "../../../../../assets/image/imagen_principal.png";
export default function Intro() {
    return (
        <div className="w-full">
            <div className="w-[80%] m-auto my-20 flex items-center min-h-[37rem] max-lg:h-[20rem]">
                <div className="w-1/2 flex justify-end max-lg:w-full max-lg:items-center">
                    <div className="w-full">
                        <h1 className="w-full flex flex-col font-bold text-6xl leading-tight max-sm:flex-col max-sm:text-3xl max-lg:flex-row max-lg:justify-center max-lg:gap-x-4 max-xl:text-4xl max-xl:font-extrabold">
                            <span>Talleres</span>
                            <span>extracurriculares</span>
                        </h1>
                        <p className="font-normal text-sm pe-20 max-lg:p-0 leading-6 text-justify">
                            Depoeventos, fundada hace más de tres años, se ha
                            destacado en la formación de talleres deportivos de
                            alta calidad. Con más de 15 disciplinas y un equipo
                            de profesionales capacitados, hemos impactado
                            positivamente en cientos de niños y adolescentes,
                            promoviendo un estilo de vida activo y saludable.
                        </p>
                        <p className="hidden max-sm:block max-sm:text-sm max-sm:italic max-sm:bg-[#0b093b] max-sm:text-white max-sm:p-2 max-sm:rounded-2xl max-sm:text-center max-sm:mt-10">
                            Familia{" "}
                            <span className="text-orange-400">Depoeventos</span>{" "}
                            - 2024
                        </p>
                    </div>
                </div>

                <div className="w-1/2 max-lg:hidden flex justify-center relative">
                    <img
                        src={FotoPrincipal}
                        className="!h-[36rem] !w-[24rem] rounded-2xl  max-xl:ms-0 max-xl:w-[17rem] max-xl:h-[29rem] animate__animated animate__bounceInRight"
                        alt=""
                        loading="lazy"
                    />
                    <div className="bg-[#0b093b] text-white p-8 rounded-2xl w-[18rem] h-[8rem] flex flex-col justify-center z-40 lg:hidden xl:block xl:absolute xl:left-8 xl:bottom-4 animate__animated animate__pulse">
                        <p className="text-sm italic">
                            "Promover el deporte como herramienta para la
                            educación en valores y la salud."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
