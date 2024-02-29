import CustomCard from "../../../../../components/card/card";
import "./courses.css";

export default function Courses() {

  const projects = [
    {
      image: "https://yt3.googleusercontent.com/ytc/AIf8zZQDYAtrD9fQrLMzN22rP50lt2DlOp0UalGBU5RP4A=s900-c-k-c0x00ffffff-no-rj",
      title: "Futbol",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    },
    {
      image: "https://yt3.googleusercontent.com/ytc/AIf8zZQDYAtrD9fQrLMzN22rP50lt2DlOp0UalGBU5RP4A=s900-c-k-c0x00ffffff-no-rj",
      title: "Tennis",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    },
    {
      image: "https://yt3.googleusercontent.com/ytc/AIf8zZQDYAtrD9fQrLMzN22rP50lt2DlOp0UalGBU5RP4A=s900-c-k-c0x00ffffff-no-rj",
      title: "Basket",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    },
    {
      image: "https://yt3.googleusercontent.com/ytc/AIf8zZQDYAtrD9fQrLMzN22rP50lt2DlOp0UalGBU5RP4A=s900-c-k-c0x00ffffff-no-rj",
      title: "Natación",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    },
    {
      image: "https://yt3.googleusercontent.com/ytc/AIf8zZQDYAtrD9fQrLMzN22rP50lt2DlOp0UalGBU5RP4A=s900-c-k-c0x00ffffff-no-rj",
      title: "Gimnasia",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    },
    {
      image: "https://yt3.googleusercontent.com/ytc/AIf8zZQDYAtrD9fQrLMzN22rP50lt2DlOp0UalGBU5RP4A=s900-c-k-c0x00ffffff-no-rj",
      title: "Skate",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.",
    },
  ];


  return (
    <div className="w-[80%] m-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">Talleres</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </div>
      <div className="place-items-center grid grid-rows-2 grid-flow-col gap-4 gap-y-12 max-sm:grid-rows-6 max-lg:grid-rows-4">
        {projects.map(project => (
          <CustomCard data={project} />
        ))}
      </div>
    </div>
  );
}
