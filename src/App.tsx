import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import AuthLayout from "./layout/AuthLayout";
import RutaGeneral from "./layout/RutaGeneral";
import ChangePassword from "./pages/auth/change-password/change-password";
import ForgotPassword from "./pages/auth/forgot-password/forgot-password";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import CampusesDashboard from "./pages/dashboard/screens/campuses-dashboard";
import CategoriesDashboard from "./pages/dashboard/screens/categories-dashboard";
import ChildrensDashboard from "./pages/dashboard/screens/childrens-dashboard";
import CoursesDashboard from "./pages/dashboard/screens/courses-dashboard";
import DisciplinesDashboard from "./pages/dashboard/screens/disciplines-dashboard";
import HomeDashboard from "./pages/dashboard/screens/home-dashboard";
import ProductsDashboard from "./pages/dashboard/screens/products-dashboard";
import Profile from "./pages/dashboard/screens/profile";
import RegistrationsDashboard from "./pages/dashboard/screens/registrations-dashboard";
import TransactionsDashboard from "./pages/dashboard/screens/transactions-dashboard";
import UsersDashboard from "./pages/dashboard/screens/users-dashboard";
import Cart from "./pages/landing/cart/cart";
import Contact from "./pages/landing/contact/contact";
import Home from "./pages/landing/home/home";
import Products from "./pages/landing/products/products";
import NotFound from "./pages/not-found/not-found";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Rutas de Autenticacion */}
            <Route path="/" element={<AuthLayout />}>
              <Route index path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* <Route
                path="/change-password/:token"
                element={<ChangePassword />}
              /> */}
              <Route
                path="/change-password"
                element={<ChangePassword />}
              />
            </Route>

            {/* Rutas Generales */}
            <Route path="/" element={<RutaGeneral />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            {/* Rutas Protegidas */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<HomeDashboard />} />
              <Route
                path="/dashboard/disciplines"
                element={<DisciplinesDashboard />}
              />
              <Route
                path="/dashboard/products"
                element={<ProductsDashboard />}
              />
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
              <Route
                path="/dashboard/campuses"
                element={<CampusesDashboard />}
              />
              <Route
                path="/dashboard/categories"
                element={<CategoriesDashboard />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
