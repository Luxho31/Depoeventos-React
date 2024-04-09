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
        <div className="custom-card">
            <img
                src={data.image}
                className="rounded-xl w-[376px] h-[309px] object-cover mb-8"
                alt={data.title}
                loading="lazy"
            />
            <h3 className="custom-card__title text-lg">{data.title}</h3>
            <p className="custom-card__description">{data.description}</p>
        </div>
    );
}
