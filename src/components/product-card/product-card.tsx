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
          <div className="w-full sm:w-[350px] md:w-[340px] min-[821px]:w-full h-[400px] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto shadow-lg rounded-2xl flex flex-col justify-between">
              <div className="flex justify-between p-4 sm:p-8">
                  <FaTableTennis className="text-2xl sm:text-3xl opacity-70" />
                  <h3 className="text-lg sm:text-2xl font-bold text-green-400">
                      S/.{product.price}.00
                  </h3>
              </div>
              <div className="px-4 py-2 sm:px-8 sm:py-4">
                  <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 text-center">
                      {product.name}
                  </h3>
                  <p className="text-sm sm:text-base">{product.description}</p>
              </div>
              <ul className="px-4 py-2 sm:px-8 sm:py-4">
                  <li className="flex items-center mb-2 sm:mb-4">
                      <FaCheck className="text-green-700" />
                      <p className="ml-2 sm:ml-4 text-base sm:text-lg font-bold">
                          {product.campus.name}
                      </p>
                  </li>
                  <li className="flex items-center">
                      <FaCheck className="text-green-700" />
                      <p className="ml-2 sm:ml-4 text-base sm:text-lg font-bold">
                          {product.category.name}
                      </p>
                  </li>
              </ul>
              <div className="w-full flex justify-center">
                  <button
                      className={`px-3 py-1 my-6 ${
                          isOutOfDateRange
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                      } text-sm sm:text-base text-white rounded`}
                      onClick={onClick}
                      disabled={isOutOfDateRange}
                  >
                      {isOutOfDateRange
                          ? "Inscripciones finalizadas"
                          : "Ver detalles"}
                  </button>
              </div>
          </div>
      );
}
