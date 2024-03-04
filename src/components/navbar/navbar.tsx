import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/image/logo.png";
import "./navbar.css";

export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {

		const storedToken = localStorage.getItem('token');
		setIsLoggedIn(!!storedToken);
	}, [])

	const logout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		navigate("/")
	};

	return (
		<>
			<nav
				className={`wrapper flexCenter animate whiteBg fixed w-full top-0 bg-white z-50 shadow-md`}
				style={{ height: "65px" }}
			>
				<div className="nav-inner container flex justify-between items-center h-full">
					<Link to={"/"} className="flex items-center gap-x-4 cursor-pointer">
						<img
							src={LogoIcon}
							alt="DepoEventos"
							className="w-10"
						/>
						<h2 className="text-lg font-semibold">
							Depo<span className="text-orange-500">Eventos</span>
						</h2>
					</Link>

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
							<Link to="/dashboard">Dashboard</Link>
						</li>
					</ul>

					<ul className="ul-wrapper-right flexNullCenter">
						{isLoggedIn ?
							(
								<li className="semiBold font15 pointer flexCenter">
									<button
										onClick={logout}
										className="radius8 lightBg"
										style={{ padding: "10px 15px" }}
									>
										Cerrar Sesión
									</button>
								</li>
							)
							:
							(<li className="semiBold font15 pointer flexCenter">
								<Link
									to="/login"
									className="radius8 lightBg"
									style={{ padding: "10px 15px" }}
								>
									Log in
								</Link>
							</li>
							)}
					</ul>
				</div>
			</nav>
		</>
	);
}
