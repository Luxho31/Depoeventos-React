import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import AuthLayout from "./layout/AuthLayout";
import RutaGeneral from "./layout/RutaGeneral";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import PaginaDos from "./pages/dashboard/screens/paginaDos";
import PaginaUno from "./pages/dashboard/screens/paginaUno";
import Contact from "./pages/landing/contact/contact";
import Home from "./pages/landing/home/home";
import Products from "./pages/landing/products/products";
import Team from "./pages/landing/team/team";
import NotFound from "./pages/not-found/not-found";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					{/* Rutas de Autenticacion */}
					<Route path="/" element={<AuthLayout />}>
						<Route index path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>

					{/* Rutas Generales */}
					<Route path="/" element={<RutaGeneral />}>
						<Route index element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/team" element={<Team />} />
						<Route path="/contact" element={<Contact />} />
					</Route>

					{/* Rutas Protegidas */}
					<Route path="/dashboard" element={<Dashboard />}>
						<Route index element={<PaginaUno />} />
						<Route path="/dashboard/paginaDos" element={<PaginaDos />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
