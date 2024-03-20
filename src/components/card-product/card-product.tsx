type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
};

type CardProps = {
  product: Product;
  onClick: () => void;
};

export default function CardProduct({ product, onClick }: CardProps) {
  return (
    <div className="bg-gray-100 shadow-lg rounded-xl cursor-pointer">
      <div className="h-60 rounded-t-xl flex justify-center relative">
        <img
          src={product.image}
          className="h-60 p-4 object-cover absolute"
          alt={product.name}
        />
        <div className="bg-blue-500 rounded-t-xl rounded-b-lg h-36 w-full" />
      </div>
      <div className="p-4 rounded-b-xl flex flex-col items-center">
        <p className="text-xl font-semibold mb-4">{product.name}</p>
        <p className="mb-4">{product.description}</p>
      </div>
      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClick}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
