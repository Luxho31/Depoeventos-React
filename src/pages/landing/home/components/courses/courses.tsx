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
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
        },
        {
            image: BasketIMG,
            title: "Basquet",
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
        },
        {
            image: GimnasiaIMG,
            title: "Gimnasia",
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
        },
        {
            image: PatinajeIMG,
            title: "Patinaje",
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
        },
        {
            image: SkateIMG,
            title: "Skateboarding",
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
        },
        {
            image: TennisIMG,
            title: "Tenis",
            description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
        },
    ];

    return (
        <div className="w-[80%] m-auto">
            <div className="mb-12">
                <h1 className="text-2xl lg:text-4xl font-extrabold mb-3">Disciplinas</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                </p>
            </div>
            {/* <div className="place-items-center grid grid-rows-2 grid-flow-col gap-4 gap-y-12 max-sm:grid-rows-6 max-lg:grid-rows-4"> */}
            <div className="place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <CustomCard data={project} key={project.title} />
                ))}
            </div>
        </div>
    );
}
