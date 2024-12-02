import { DownOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Popconfirm,
  Space,
  Spin,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard, RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import LogoIcon from "../../assets/image/logo.png";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import { navbarItems } from "../../utils/routes/items-navbar";
import "./navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState("");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { logout, isAuthenticated, userInfo, cargando } = useAuth();
  const { products, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const renderUserName = () => {
    if (isAuthenticated && userInfo) {
      return (
        <Space>
          <Avatar size={30} src={userInfo.photo} />
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
        </Space>
      );
    } else if (isAuthenticated && cargando) {
      return (
        <Spin
          fullscreen
          indicator={<LoadingOutlined className=" text-2xl" />}
        />
      );
    } else {
      return (
        <Spin fullscreen indicator={<LoadingOutlined className="text-2xl" />} />
      );
    }
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setOpen(false);
    setIsLoggedIn(!!storedToken);
  }, []);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      logout();
      toast.info("Sesión cerrada exitosamente");
      navigate("/");
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const handleHover = (url = "") => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    if (url) {
      setHoveredItem(url);
    } else {
      timeoutIdRef.current = setTimeout(() => setHoveredItem(""), 300);
    }
  };

  const currentItem = navbarItems.find((item) => item.url === hoveredItem);
  const items: MenuProps["items"] = [
    {
      label: "Perfil",
      key: "1",
      icon: <UserOutlined />,
      onClick: () => handleItemClick("/dashboard/profile"),
    },
    {
      label: "Dashboard",
      key: "2",
      onClick: () => handleItemClick("/dashboard"),
      icon: <RxDashboard />,
      danger: false,
    },
    {
      label: "Cerrar Sesión",
      key: "3",
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

  if (cargando)
    return (
      <Spin fullscreen indicator={<LoadingOutlined className="text-2xl" />} />
    );

  return (
    <nav
      className={`fixed w-full top-0 bg-white z-50 shadow-md`}
      style={{ height: "65px" }}
    >
      <Toaster richColors />
      <div className="container flex justify-between items-center w-[80%] h-full m-auto">
        <Link to={"/"} className="flex items-center gap-x-4 cursor-pointer">
          <img src={LogoIcon} alt="DepoEventos" className="w-10" />
          <h2 className="text-lg font-semibold max-sm:hidden">
            Depo<span className="text-orange-500">Eventos</span>
          </h2>
        </Link>

        <div className="lg:w-[600px] w-full hidden lg:flex justify-center items-center h-full">
          <div className="relative">
            <ul className="flex space-x-6">
              {navbarItems.map((item) => (
                <li
                  key={item.url}
                  className={`relative px-3 py-1 rounded-lg transition-colors ${
                    hoveredItem === item.url
                      ? " text-black"
                      : "hover:text-red-400"
                  }`}
                  onMouseEnter={() => handleHover(item.url)}
                  onMouseLeave={() => handleHover()}
                >
                  <NavLink to={item.url}>{item.name}</NavLink>
                </li>
              ))}
            </ul>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {hoveredItem &&
                currentItem?.subCategories &&
                currentItem?.subCategories.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full w-full mt-1 bg-white shadow-lg rounded-xl p-8 grid grid-cols-2 md:grid-cols-2 gap-4"
                    onMouseEnter={() => handleHover(hoveredItem)}
                    onMouseLeave={() => handleHover()}
                  >
                    {currentItem.subCategories.map((subCategory, index) => (
                      <div key={index} className="flex flex-col">
                        <h3 className="text-orange-600 mb-2 select-none text-sm">
                          {subCategory.header}
                        </h3>
                        <hr className="border-t border-gray-500 mb-3 w-9 border-2" />
                        <ul className="space-y-2 ">
                          {subCategory.items.map((item, idx) => (
                            <li key={idx} className="">
                              <Link
                                to={item.url}
                                className="text-gray-700 hover:text-orange-900 text-sm"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center">
          <ul className="">
            <li className="">
              <Dropdown
                placement="bottomRight"
                overlay={
                  <div className="bg-white rounded-md px-4 py-2 max-md:hidden">
                    <table id="lista-carrito" className="u-full-width">
                      <thead>
                        <tr className="flex gap-12 leading-10 border-b-2">
                          <th className="w-1/2">Nombre</th>
                          <th className="w-1/2">Precio</th>
                          <th className="w-1/2">Cantidad</th>
                          <th className="w-1/2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-3">
                              No hay productos en el carrito
                            </td>
                          </tr>
                        ) : (
                          products.map((product) => (
                            <tr
                              key={product.id}
                              className="flex gap-12 leading-10"
                            >
                              <td className="w-1/2">
                                {product && product.name.length > 8
                                  ? `${product.name.split(" ", 1).join(" ")}...`
                                  : product.name}
                              </td>
                              <td className="w-1/2">
                                S/.{product && product.price}
                              </td>
                              <td className="w-1/2">1</td>
                              <td>
                                <button className="text-red-500">
                                  <i className="fas fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    <Popconfirm
                      title="¿Estás seguro de que deseas limpiar el carrito?"
                      onConfirm={clearCart}
                      okText="Sí"
                      okButtonProps={{
                        className: "bg-blue-700",
                      }}
                      cancelText="No"
                    >
                      <button className="w-full text-neutral-400 border-neutral-300 border-[1px] rounded-md py-2 my-4">
                        Vaciar Carrito
                      </button>
                    </Popconfirm>
                  </div>
                }
                className="border-none"
              >
                <Button className="me-4">
                  <Badge count={isAuthenticated ? products.length : 0}>
                    <Link to="/cart">
                      <FaShoppingCart className="text-2xl" />
                    </Link>
                  </Badge>
                </Button>
              </Dropdown>
            </li>
          </ul>

          <ul className="flex items-center max-lg:hidden">
            {/* Autenticacion */}
            {isAuthenticated ? (
              <li className="">
                <Dropdown menu={menuProps} className="border-none">
                  <Button className="p-0">
                    <Space>
                      {renderUserName()}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </li>
            ) : (
              <li className="">
                <Link
                  to="/login"
                  className="w-fit text-center border rounded-lg hover:shadow-md px-6 py-2"
                >
                  Acceder
                </Link>
              </li>
            )}
          </ul>
          <Button
            className="hidden max-lg:block border-none text-2xl"
            onClick={showDrawer}
          >
            <RxHamburgerMenu />
          </Button>
        </div>
      </div>

      <Drawer onClose={onClose} open={open}>
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col justify-center items-center gap-6">
            <li className="">
              <NavLink to="/" onClick={onClose}>
                Inicio
              </NavLink>
            </li>

            <li className="">
              <NavLink to="/products" onClick={onClose}>
                Productos
              </NavLink>
            </li>

            <li className="">
              <NavLink to="/contact" onClick={onClose}>
                Contacto
              </NavLink>
            </li>

            <li className={`${isAuthenticated ? "block" : "hidden"}`}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {/* Autenticacion */}
            {isAuthenticated ? (
              <li className="w-full flex justify-center my-8">
                <Button
                  className="w-fit h-fit text-center border rounded-lg shadow-md px-8 py-2"
                  onClick={() => handleItemClick("/dashboard/profile")}
                >
                  <Space>
                    <Avatar size={30} src={userInfo?.photo} />
                    {userInfo?.firstName + " " + userInfo?.lastName}
                  </Space>
                </Button>
              </li>
            ) : (
              <li className="w-full flex justify-center my-8">
                <Link
                  to="/login"
                  className="w-fit text-center border rounded-lg shadow-md px-8 py-2"
                >
                  Acceder
                </Link>
              </li>
            )}
          </ul>

          {isAuthenticated ? (
            <div className="w-full flex flex-col">
              <hr className="h-px bg-gray-300 mb-6" />
              <Button
                className="border-none text-gray-600 flex justify-center items-center gap-x-2"
                onClick={handleLogout}
              >
                <FiLogOut />
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Drawer>
    </nav>
  );
}
