import { FaCheck, FaTableTennis } from "react-icons/fa";
// import { CLIENT_ROUTES } from "../../routes/client.routes";

type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  // Otros campos del producto desde el backend
};

type CardProps = {
  product: Product;
  onClick: () => void;
};

export default function ProductCard({ product, onClick }: CardProps) {
  return (
    <div className="!w-[300px] !h-[350px] shadow-lg rounded-2xl">
      <div className="flex justify-between p-8">
        <FaTableTennis className="text-3xl opacity-70" />
        <h3 className="text-2xl font-bold text-green-400">S/.{product.price}.00</h3>
      </div>
      <div className="px-8 py-4">
        <h3 className="text-2xl font-bold mb-3 text-center">
          {product.name}
        </h3>
        <p className="w-full">
          {product.description}
        </p>
      </div>
      <ul className="px-8 py-4">

        <li className="flex items-center mb-4">
          <FaCheck className="text-green-700" />
          <p className="ms-4 text-lg font-bold">Lorem Ipsum</p>
        </li>



      </ul>
      <div className="w-full flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClick}
        >
          Ver detalles
        </button>
      </div>
    </div >
  );
}
