import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-white w-full h-[70px] flex flex-row items-center justify-center px-10  ">
      <h1 className="text-xl italic font-bold">
        Depo<span className="text-orange-600">Eventos</span>
      </h1>
      <p className="m-auto text-slate-400">© 2024 Depoeventos, Perú</p>
      <div className="flex flex-row gap-2 text-2xl ">
        <a
          className="text-slate-600"
          href="https://www.facebook.com"
          target="_blank"
        >
          <FaFacebook />
        </a>
        <a
          className="text-slate-600"
          href="https://www.instagram.com"
          target="_blank"
        >
          <FaInstagramSquare />
        </a>
        <a
          className="text-slate-600"
          href="https://www.twitter.com"
          target="_blank"
        >
          <FaXTwitter />
        </a>
        <a
          className="text-slate-600"
          href="https://www.pinterest.com"
          target="_blank"
        >
          <FaPinterest />
        </a>
      </div>
    </div>
  );
}
