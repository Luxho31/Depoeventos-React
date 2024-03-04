// import { Link } from "react-router-dom";
// import { CLIENT_ROUTES } from "../../../../../shared/routes/client.routes";
// import BurgerIcon from "./burger-icon/burger-icon.js";
import { NavLink, Link } from "react-router-dom";
// import LogoIcon from "../../../../../../assets/logo.png";
import "./navbar.css"

export default function Navbar() {
  return (
    <>
      <nav
        className={`wrapper flexCenter animate whiteBg fixed w-full top-0 bg-white z-50 shadow-md`}
        style={{ height: "65px" }}
      >
        <div className="nav-inner container flex justify-between items-center h-full">
          <div className="pointer flexNullCenter">
            {/* <img
              src={LogoIcon}
              alt="DepoEventos"
              style={{ width: "50px", marginBottom: "10px" }}
            /> */}
            <h1 className="ml-7 text-lg font-semibold">
              Depo<span className="text-orange-500">Eventos</span>
            </h1>
          </div>
          {/* <button className="burder-wrapper point">
            <BurgerIcon></BurgerIcon>
          </button> */}
          <ul className="ul-wrapper flex  gap-2">
            <li className="semiBold font15 pointer">
              <NavLink to="/">Inicio</NavLink>
            </li>

            <li className="semiBold font15 pointer">
              <NavLink to="/packages">Paquetes</NavLink>
            </li>

            <li className="semiBold font15 pointer">
              <NavLink to="/courses">Cursos</NavLink>
            </li>

            <li className="semiBold font15 pointer">
              <NavLink to="/team">Equipo</NavLink>
            </li>

            <li className="semiBold font15 pointer">
              <NavLink to="/contact">Contacto</NavLink>
            </li>

            <li className="semiBold font15 pointer">
              <Link to="/dashboard" target="_blank">Dashboard</Link>
            </li>
          </ul>
          <ul className="ul-wrapper-right flexNullCenter">
            <li className="semiBold font15 pointer flexCenter">
              <Link
                to="/login"
                className="radius8 lightBg"
                style={{ padding: "10px 15px" }}
              >
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
