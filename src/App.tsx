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
import AssistsDashboard from "./pages/dashboard/screens/assists-dashboard";
import AssistsDashboardId from "./pages/dashboard/screens/assists-dashboard/[id]";
import CampusesDashboard from "./pages/dashboard/screens/campuses-dashboard";
import CategoriesDashboard from "./pages/dashboard/screens/categories-dashboard";
import ChildrensDashboard from "./pages/dashboard/screens/childrens-dashboard";
import ComplaintsBookDashboard from "./pages/dashboard/screens/complaints-book-dashboard";
import CoursesDashboard from "./pages/dashboard/screens/courses-dashboard";
import CoursesWithChildrenDashboard from "./pages/dashboard/screens/courses-with-children-dashboard";
import DisciplinesDashboard from "./pages/dashboard/screens/disciplines-dashboard";
import HomeDashboard from "./pages/dashboard/screens/home-dashboard";
import IncidentsDashboard from "./pages/dashboard/screens/incidents-dashboard";
import IncidentsTeachersDashboard from "./pages/dashboard/screens/incidents-teachers-dashboard";
import TestimonialDashboard from "./pages/dashboard/screens/opinions-dashboard";
import ProductsDashboard from "./pages/dashboard/screens/products-dashboard";
import Profile from "./pages/dashboard/screens/profile";
import RegistrationsDashboard from "./pages/dashboard/screens/registrations-dashboard";
import ScheduleDashboard from "./pages/dashboard/screens/schedule-dashboard";
import TransactionsDashboard from "./pages/dashboard/screens/transactions-dashboard";
import TrustedCompaniesDashboard from "./pages/dashboard/screens/trusted-companies-dashboard";
import UsersDashboard from "./pages/dashboard/screens/users-dashboard";
import VideosDashboard from "./pages/dashboard/screens/videos-dashboard";
import Cart from "./pages/landing/cart/cart";
import PurchaseCompleted from "./pages/landing/cart/components/purchase-completed";
import { ComplaintsBook } from "./pages/landing/complaints-book/complaints-book";
import Contact from "./pages/landing/contact/contact";
import { FaqSection } from "./pages/landing/faq/faq";
import Home from "./pages/landing/home/home";
import Opinions from "./pages/landing/opinions/opinions";
import Products from "./pages/landing/products/products";
import ProductsByLocation from "./pages/landing/products/products-by-location/[id]";
import NotFound from "./pages/not-found/not-found";
import ReturnsDashboard from "./pages/dashboard/screens/returns-dashboard";


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
              <Route
                path="/change-password/:token"
                element={<ChangePassword />}
              />
              {/* <Route
                path="/change-password"
                element={<ChangePassword />}
              /> */}
            </Route>
            {/* Rutas Generales */}
            <Route path="/" element={<RutaGeneral />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              {/* Nueva ruta de productos */}
              <Route path="/products/:id" element={<ProductsByLocation />} />
              {/* ----------------------- */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Opinions />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/purchase-completed"
                element={<PurchaseCompleted />}
              />
              <Route path="/complaints-book" element={<ComplaintsBook />} />
              <Route path="/faq" element={<FaqSection />} />
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
              <Route
                path="/dashboard/schedule"
                element={<ScheduleDashboard />}
              />
              <Route
                path="/dashboard/testimonials"
                element={<TestimonialDashboard />}
              />
              <Route path="/dashboard/videos" element={<VideosDashboard />} />
              <Route
                path="/dashboard/complaints-book"
                element={<ComplaintsBookDashboard />}
              />

              {/* Assists */}
              <Route path="/dashboard/assists" element={<AssistsDashboard />} />
              <Route
                path="/dashboard/assists/:id/date/:date"
                element={<AssistsDashboardId />}
              />

              {/* Incidents */}
              <Route
                path="/dashboard/incidents"
                element={<IncidentsDashboard />}
              />
              <Route
                path="/dashboard/incidents-teachers"
                element={<IncidentsTeachersDashboard />}
              />

              {/* Trusted companies */}
              <Route
                path="/dashboard/trusted-companies"
                element={<TrustedCompaniesDashboard />}
              />

              {/* Returns */}
              <Route
                path="/dashboard/returns"
                element={<ReturnsDashboard />}
              />
              
              {/* Courses with children */}
              <Route
                path="/dashboard/courses-with-children"
                element={<CoursesWithChildrenDashboard />}
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
