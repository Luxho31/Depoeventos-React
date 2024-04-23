import { FaCheck } from "react-icons/fa";

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
  categories: {
    id: number;
    name: string;
    description: string;
  }[];
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
        .map((course) => course.name)
        .join(", ") + "..."
      : product.courses.length === 1
        ? ""
        : product.courses.map((course) => course.name).join(", ");

  function formatAges(ages: string[]): string {
    return ages
      .map((age) => `${age} ${parseInt(age) === 1 ? "año" : "años"}`)
      .join(", ");
  }

  function formatGrades(grades: string[]): string {
    const gradeNames: any = {
      "1": "1er grado",
      "2": "2do grado",
      "3": "3er grado",
      "4": "4to grado",
      "5": "5to grado",
      "6": "6to grado",
      "7": "7mo grado",
      "8": "8vo grado",
      "9": "9no grado",
      "10": "10mo grado",
      "11": "11vo grado",
      "12": "12vo grado",
      "13": "13vo grado",
      "14": "14vo grado",
      "15": "15vo grado",

      "Nido": "Nido",
      "Pre-kinder": "Pre-kinder",
      "Kinder": "Kinder",
    };

    return grades.map((grade: any) => gradeNames[grade] || grade).join(", ");
  }

  const agesNames = formatAges(product.ages);
  const gradesNames = formatGrades(product.grades);

  return (
    <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full p-4 sm:p-9">
      <div className="flex justify-between">
        <div className="text-xl text-center font-semibold text-gray-900 ">
          {product.name}
        </div>
        <h3 className="text-md sm:text-lg text-green-400">
          S/.{product.price}.00
        </h3>
      </div>
      <hr className="mt-4" />
      <p className="mt-6 text-xs text-center text-gray-600">{courseNames}</p>
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
          <p className="ml-2 text-sm sm:ml-4">{product.categories
            .map((category: { name: string }) => category.name)
            .join(", ")}</p>
        </li>
        <li className="flex items-center mb-2">
          <FaCheck className="text-green-700 text-xs" />
          <p className="ml-2 text-sm sm:ml-4">{agesNames}</p>
        </li>
        <li className="flex items-center">
          <FaCheck className="text-green-700 text-xs" />
          <p className="ml-2 text-sm sm:ml-4">{gradesNames}</p>
        </li>
      </ul>
      <div className="w-full flex justify-center">
        <button
          className={`px-3 py-1 my-2 ${isOutOfDateRange || isOutOfStock
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
