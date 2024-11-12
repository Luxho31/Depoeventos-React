import { BiBook } from "react-icons/bi";
import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gray-100 w-full">
      <div className="w-[90%] m-auto py-4 flex flex-col md:flex-row gap-y-8 items-center justify-center">
        <Link to="/" className="text-xl italic font-bold max-md:hidden">
          Depo<span className="text-orange-600">Eventos</span>
        </Link>
        <div className="flex w-full flex-col justify-center items-center gap-y-2">
          <Link to="/" className="m-auto text-slate-400">
            © 2024 Depoeventos, Perú
          </Link>
          <Link
            to="/complaints-book"
            className="flex items-center justify-center gap-x-1 text-slate-400 text-sm ml-4 hover:text-orange-600 transition-colors"
          >
            <p>Libro de reclamaciones</p>
            <BiBook />
          </Link>
        </div>
        <div className="flex flex-row gap-2 text-2xl ">
          <div className="text-slate-400 cursor-default">
            <FaFacebook />
          </div>
          <a
            className="text-slate-600"
            href="https://www.instagram.com/depo.eventos/"
            target="_blank"
          >
            <FaInstagramSquare />
          </a>
          <div className="text-slate-400 cursor-default">
            <FaXTwitter />
          </div>
          <div className="text-slate-400 cursor-default">
            <FaPinterest />
          </div>
        </div>
      </div>
    </div>
  );
}
