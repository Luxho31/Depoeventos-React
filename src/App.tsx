import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import AuthLayout from "./layout/AuthLayout";
import RutaGeneral from "./layout/RutaGeneral";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import Contact from "./pages/landing/contact/contact";
import Home from "./pages/landing/home/home";
import Products from "./pages/landing/products/products";
import Team from "./pages/landing/team/team";
import NotFound from "./pages/not-found/not-found";
import DisciplinesDashboard from "./pages/dashboard/screens/disciplines-dashboard";
import ProductsDashboard from "./pages/dashboard/screens/products-dashboard";
import UsersDashboard from "./pages/dashboard/screens/users-dashboard";
import ChildrensDashboard from "./pages/dashboard/screens/childrens-dashboard";
import CoursesDashboard from "./pages/dashboard/screens/courses-dashboard";
import RegistrationsDashboard from "./pages/dashboard/screens/registrations-dashboard";
import TransactionsDashboard from "./pages/dashboard/screens/transactions-dashboard";
import ForgotPassword from "./pages/auth/forgot-password/forgot-password";
import ChangePassword from "./pages/auth/change-password/change-password";
import Profile from "./pages/dashboard/screens/profile";
import CampusesDashboard from "./pages/dashboard/screens/campuses-dashboard";
import CategoriesDashboard from "./pages/dashboard/screens/categories-dashboard";
import { useEffect } from "react";

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const renewTokenOnLoad = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/renewToken/${localStorage.getItem(
              "token"
            )}}`,
            {
              method: "GET",
            }
          );
          if (!response.ok || localStorage.getItem("token") == "") {
            localStorage.removeItem("token");
            throw new Error("Error al renovar el token");
          }

          const newToken = await response.text();
          localStorage.setItem("token", newToken);
        } catch (error) {
          console.error("Error al renovar el token:", error);
        }
      }
    };
    renewTokenOnLoad();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas de Autenticacion */}
          <Route path="/" element={<AuthLayout />}>
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/change-password/:token"
              element={<ChangePassword />}
            />
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
            <Route index element={<DisciplinesDashboard />} />
            <Route path="/dashboard/products" element={<ProductsDashboard />} />
            <Route path="/dashboard/Users" element={<UsersDashboard />} />
            <Route
              path="/dashboard/childrens"
              element={<ChildrensDashboard />}
            />
            <Route path="/dashboard/courses" element={<CoursesDashboard />} />
            <Route
              path="/dashboard/registrations"
              element={<RegistrationsDashboard />}
            />
            <Route
              path="/dashboard/transactions"
              element={<TransactionsDashboard />}
            />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/campuses" element={<CampusesDashboard />} />
            <Route
              path="/dashboard/categories"
              element={<CategoriesDashboard />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
