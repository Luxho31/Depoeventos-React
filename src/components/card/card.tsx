import "./card.css";

export default function CustomCard({ data }: any) {
  return (
    <div className="custom-card">
      <img
        src={data.image}
        className="rounded-xl w-[376px] h-[309px] object-cover mb-8 transition hover:opacity-50 hover:transition hover:scale-110"
        alt={data.title}
      />
      <h3 className="custom-card__title text-lg">{data.title}</h3>
      <p className="custom-card__description">{data.description}</p>
    </div>
  );
}
