import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import LogoIcon from "../../assets/image/logo.png";
import { useAuth } from "../../context/AuthProvider";
import "./navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated, userInfo, cargando } = useAuth();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    setIsLoggedIn(!!storedToken);
  }, []);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    toast.info("Sesión cerrada exitosamente");
    navigate("/");
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "Perfil",
      key: "1",
      icon: <UserOutlined />,
      onClick: () => handleItemClick("/dashboard/profile"),
    },
    {
      label: "Cerrar Sesión",
      key: "2",
      icon: <IoIosLogOut />,
      danger: true,
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  if (cargando) return <Spin fullscreen />;

  return (
    <>
      <nav
        className={`fixed w-full top-0 bg-white z-50 shadow-md`}
        style={{ height: "65px" }}
      >
        <Toaster richColors />
        <div className="container flex justify-between items-center h-full">
          <Link to={"/"} className="flex items-center gap-x-4 cursor-pointer">
            <img src={LogoIcon} alt="DepoEventos" className="w-10" />
            <h2 className="text-lg font-semibold">
              Depo<span className="text-orange-500">Eventos</span>
            </h2>
          </Link>

          <ul className="flex gap-2">
            <li className="">
              <NavLink to="/">Inicio</NavLink>
            </li>

            <li className="">
              <NavLink to="/products">Productos</NavLink>
            </li>

            <li className="">
              <NavLink to="/team">Equipo</NavLink>
            </li>

            <li className="">
              <NavLink to="/contact">Contacto</NavLink>
            </li>

            <li className={`${isAuthenticated ? "block" : "hidden"}`}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <ul className="flex items-center">
            <button className="p-2 me-8">
              <FaShoppingCart className="text-2xl" />
            </button>
            {isAuthenticated ? (
              <li className="">
                <Dropdown menu={menuProps} className="border-none">
                  <Button className="p-0">
                    <Space>
                      <Avatar size={30} icon={<UserOutlined />} />
                      {userInfo?.firstName + " " + userInfo?.lastName}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </li>
            ) : (
              <li className="">
                <Link to="/login" className="" style={{ padding: "10px 15px" }}>
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
