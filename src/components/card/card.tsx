import "./card.css";

interface CustomCardProps {
  data: {
    image: string;
    title: string;
    description: string;
  };
}

export default function CustomCard({ data }: CustomCardProps) {
  return (
    <div className="w-[80%] flex flex-col items-center mb-6">
      <img
        src={data.image}
        className="rounded-xl w-[376px] h-[309px] object-cover mb-3"
        alt={data.title}
        loading="lazy"
      />
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-md font-semibold">{data.title}</h3>
        <p className="text-sm text-center mt-1">{data.description}</p>
      </div>
    </div>
  );
}
