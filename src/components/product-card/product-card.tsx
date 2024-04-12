import { FaCheck, FaTableTennis } from "react-icons/fa";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    startDate: string;
    endDate: string;
    maxStudents: number;
    currentStudents: number;
    campus: {
        // map: any;
        id: number;
        name: string;
        description: string;
    }[];
    category: {
        id: number;
        name: string;
        description: string;
    };
    startDateInscription: string;
    endDateInscription: string;
    courses: Course[];
    ages: string[];
    grades: string[];
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

    const isOutOfStock = product.currentStudents === product.maxStudents;

    const courseNames =
        product.courses.length > 3
            ? product.courses
                  .slice(0, 3)
                  .map((course: { name: string }) => course.name)
                  .join(", ") + "..."
            : product.courses
                  .map((course: { name: string }) => course.name)
                  .join(", ");

    const agesNames =
        product.ages.length > 3
            ? product.ages.slice(0, 3).join(", ") + "..."
            : product.ages.join(", ");

    return (
        // <div className="w-full sm:w-[350px] md:w-[340px] min-[821px]:w-full h-[400px]  mx-auto shadow-lg rounded-2xl flex flex-col justify-between">
        // <div className="w-96 lg:w-80 xl:w-full 2xl:w-64 shadow-lg rounded-2xl">
        //     <div className="flex justify-between p-4 sm:p-6">
        //         <FaTableTennis className="text-2xl sm:text-3xl opacity-70" />
        //         <h3 className="text-lg sm:text-xl font-semibold text-green-400">
        //             S/.{product.price}.00
        //         </h3>
        //     </div>
        //     <div className="px-4 py-2 sm:px-8 sm:py-4">
        //         <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-center">
        //             {product.name}
        //         </h3>
        //         <div className="flex justify-center">
        //             <p className="text-xs text-gray-400">{courseNames}</p>
        //         </div>
        //     </div>
        //     <ul className="px-4 py-2 sm:px-8 sm:py-4">
        //         <li className="flex items-center mb-2">
        //             <div>
        //                 <FaCheck className="text-green-700 text-xs" />
        //             </div>
        //             <p className="ml-2 text-sm sm:ml-4">
        //                 {product.campus
        //                     .map((campus: { name: string }) => campus.name)
        //                     .join(" - ")}
        //             </p>
        //         </li>
        //         <li className="flex items-center mb-2">
        //             <FaCheck className="text-green-700 text-xs" />
        //             <p className="ml-2 text-sm sm:ml-4">
        //                 {product.category.name}
        //             </p>
        //         </li>
        //         <li className="flex items-center mb-2">
        //             <FaCheck className="text-green-700 text-xs" />
        //             <p className="ml-2 text-sm sm:ml-4">{agesNames}</p>
        //         </li>
        //         <li className="flex items-center">
        //             <FaCheck className="text-green-700 text-xs" />
        //             <p className="ml-2 text-sm sm:ml-4">
        //                 {product.grades.join(", ")}
        //             </p>
        //         </li>
        //     </ul>
        //     <div className="w-full flex justify-center">
        //         <button
        //             className={`px-3 py-1 my-6 ${
        //                 isOutOfDateRange || isOutOfStock
        //                     ? "bg-gray-400 cursor-not-allowed"
        //                     : "bg-blue-500 hover:bg-blue-600"
        //             } text-sm sm:text-base text-white rounded`}
        //             onClick={onClick}
        //             disabled={isOutOfDateRange || isOutOfStock}
        //         >
        //             {isOutOfDateRange
        //                 ? "Fuera de rango de inscripción"
        //                 : isOutOfStock
        //                 ? "Sin stock"
        //                 : "Inscribirse"}
        //         </button>
        //     </div>
        // </div>

        <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full p-4 sm:p-9">
            <div className="flex justify-between">
                <FaTableTennis className="text-2xl sm:text-3xl opacity-70" />
                <h3 className="text-lg sm:text-xl font-semibold text-green-400">
                    S/.{product.price}.00
                </h3>
            </div>
            <h3 className="mt-6 text-2xl text-center font-semibold text-gray-900 sm:mt-10">
                {product.name}
            </h3>
            <p className="mt-6 text-base text-gray-600">{courseNames}</p>
            <ul className="px-4 py-2 sm:px-8 sm:py-4">
                <li className="flex items-center mb-2">
                    <div>
                        <FaCheck className="text-green-700 text-xs" />
                    </div>
                    <p className="ml-2 text-sm sm:ml-4">
                        {product.campus
                            .map((campus: { name: string }) => campus.name)
                            .join(" - ")}
                    </p>
                </li>
                <li className="flex items-center mb-2">
                    <FaCheck className="text-green-700 text-xs" />
                    <p className="ml-2 text-sm sm:ml-4">
                        {product.category.name}
                    </p>
                </li>
                <li className="flex items-center mb-2">
                    <FaCheck className="text-green-700 text-xs" />
                    <p className="ml-2 text-sm sm:ml-4">{agesNames}</p>
                </li>
                <li className="flex items-center">
                    <FaCheck className="text-green-700 text-xs" />
                    <p className="ml-2 text-sm sm:ml-4">
                        {product.grades.join(", ")}
                    </p>
                </li>
            </ul>
            <div className="w-full flex justify-center">
                <button
                    className={`px-3 py-1 my-2 ${
                        isOutOfDateRange || isOutOfStock
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    } text-sm sm:text-base text-white rounded`}
                    onClick={onClick}
                    disabled={isOutOfDateRange || isOutOfStock}
                >
                    {isOutOfDateRange
                        ? "Fuera de rango de inscripción"
                        : isOutOfStock
                        ? "Sin stock"
                        : "Inscribirse"}
                </button>
            </div>
        </div>
    );
}
