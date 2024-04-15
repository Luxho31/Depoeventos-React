interface CampusCardProps {
  id: number;
  direction: string;
  title: string;
  description: string;
  logo: string;
  image: string;
}

export default function CampusCard(data: CampusCardProps) {
  return (
    <div className="w-full h-[16rem] sm:w-[80%] sm:h-[20rem] md:w-[85%] md:h-[28rem] m-auto mb-10 rounded-2xl flex shadow-md">
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
        <div className="px-6 md:px-12">
          <h3 className="text-sm md:text-md font-medium">{data.direction}</h3>
          <h2 className="text-xl md:text-3xl font-bold mb-3">
            {data.title}
          </h2>
          <p className="text-xs max-sm:hidden md:text-sm text-justify">
            {data.description}
          </p>
        </div>
        <img
          src={data.logo}
          className="w-16 md:w-20 pt-8"
          alt=""
          loading="lazy"
        />
      </div>
      {/* Contenido derecho */}
      <div className="hidden lg:flex lg:justify-center lg:items-center lg:w-1/2 ">
        <img
          src={data.image}
          className="rounded-3xl object-cover !w-[90%] !h-[80%] shadow-xl"
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  );
}
