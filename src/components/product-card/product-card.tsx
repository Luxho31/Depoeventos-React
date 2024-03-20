import { FaCheck, FaTableTennis } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  startDate: string;
  maxStudents: number;
  campus: {
    id: number;
    name: string;
    description: string;
  };
  category: {
    id: number;
    name: string;
    description: string;
  };
  startDateInscription: string;
  endDateInscription: string;
  courses: Course[];
};

type Course = {
  id: number;
  name: string;
  description: string;
};

type CardProps = {
  product: Product;
  onClick: () => void;
};

export default function ProductCard({ product, onClick }: CardProps) {
  const currentDate = new Date();
  const startDateInscription = new Date(product.startDateInscription);
  const endDateInscription = new Date(product.endDateInscription);
  const isOutOfDateRange =
    currentDate < startDateInscription || currentDate > endDateInscription;

  return (
    <div className="!w-[350px] !h-[500px] shadow-lg rounded-2xl flex flex-col justify-between">
      <div className="flex justify-between p-8">
        <FaTableTennis className="text-3xl opacity-70" />
        <h3 className="text-2xl font-bold text-green-400">
          S/.{product.price}.00
        </h3>
      </div>
      <div className="px-8 py-4">
        <h3 className="text-xl font-bold mb-3 text-center">{product.name}</h3>
        <p className="w-full">{product.description}</p>
      </div>
      <ul className="px-8 py-4">
        <li className="flex items-center mb-4">
          <FaCheck className="text-green-700" />
          <p className="ms-4 text-lg font-bold">{product.campus.name}</p>
        </li>
        <li className="flex items-center mb-4">
          <FaCheck className="text-green-700" />
          <p className="ms-4 text-lg font-bold">{product.category.name}</p>
        </li>
      </ul>
      <div className="w-full flex justify-center">
        <button
          className={`px-4 py-2 my-8 ${
            isOutOfDateRange
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded`}
          onClick={onClick}
          disabled={isOutOfDateRange}
        >
          {isOutOfDateRange ? "Inscripciones finalizadas" : "Ver detalles"}
        </button>
      </div>
    </div>
  );
}
