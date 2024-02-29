import { FaTableTennis } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { CLIENT_ROUTES } from "../../routes/client.routes";

export default function PackageCard() {
  return (
    <div className="!w-[400px] !h-[500px] shadow-lg rounded-2xl">
      <div className="flex justify-between p-8">
        <FaTableTennis className="text-3xl opacity-70" />
        <h3 className="text-2xl font-bold text-green-400">S/. 1200.00</h3>
      </div>
      <div className="px-8 py-4">
        <h3 className="text-2xl font-bold mb-3 text-center">
          Paquete Completo
        </h3>
        <p className="w-full">
          Lorem ipsum dolor sit amet, amet sadipscing elitr, sed diam nonumy
          eirmod tempor.
        </p>
      </div>
      <ul className="px-8 py-4">
        <li className="flex items-center mb-4">
          <FaCheck className="text-green-700" />
          <p className="ms-4 text-lg font-bold">Lorem ipsum</p>
        </li>
        <li className="flex items-center mb-4">
          <FaCheck className="text-green-700" />
          <p className="ms-4 text-lg font-bold">Lorem ipsum</p>
        </li>
        <li className="flex items-center mb-4">
          <FaCheck className="text-green-700" />
          <p className="ms-4 text-lg font-bold">Lorem ipsum</p>
        </li>
        <li className="flex items-center mb-4">
          <FaCheck className="text-green-700" />
          <p className="ms-4 text-lg font-bold">Lorem ipsum</p>
        </li>
      </ul>
      <div className="w-full flex justify-center">
        {/* <Link
          to={CLIENT_ROUTES.PACKS}
          className="bg-[#f46e16] py-2 px-12 rounded-xl text-white"
        >
          Buy
        </Link> */}
      </div>
    </div>
  );
}
