import { DownOutlined, UserOutlined } from "@ant-design/icons";
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
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import LogoIcon from "../../assets/image/logo.png";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import "./navbar.css";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { logout, isAuthenticated, userInfo, cargando } = useAuth();
    const { products, clearCart } = useCart();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

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
        <nav
            className={`fixed w-full top-0 bg-white z-50 shadow-md`}
            style={{ height: "65px" }}
        >
            <Toaster richColors />
            <div className="container flex justify-between items-center w-[80%] h-full m-auto">
                <Link
                    to={"/"}
                    className="flex items-center gap-x-4 cursor-pointer"
                >
                    <img src={LogoIcon} alt="DepoEventos" className="w-10" />
                    <h2 className="text-lg font-semibold">
                        Depo<span className="text-orange-500">Eventos</span>
                    </h2>
                </Link>

                <ul className="flex gap-2 max-lg:hidden">
                    <li className="">
                        <NavLink to="/">Inicio</NavLink>
                    </li>

                    <li className="">
                        <NavLink to="/products">Productos</NavLink>
                    </li>

                    <li className="">
                        <NavLink to="/contact">Contacto</NavLink>
                    </li>

                    <li className={`${isAuthenticated ? "block" : "hidden"}`}>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>

                <div className="flex items-center">
                    <ul className="">
                        <li className="">
                            <Dropdown
                                placement="bottomRight"
                                overlay={
                                    <div className="bg-white rounded-md px-4 py-2">
                                        <table
                                            id="lista-carrito"
                                            className="u-full-width"
                                        >
                                            <thead>
                                                <tr className="flex gap-12 leading-10 border-b-2">
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={4}>
                                                            No hay productos en
                                                            el carrito
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    products.map((product) => (
                                                        <tr
                                                            key={product.id}
                                                            className="flex gap-12 leading-10"
                                                        >
                                                            <td>
                                                                {product &&
                                                                    product.name}
                                                            </td>
                                                            <td>
                                                                $
                                                                {product &&
                                                                    product.price}
                                                            </td>
                                                            <td>1</td>
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
                                    <Badge
                                        count={
                                            isAuthenticated
                                                ? products.length
                                                : 0
                                        }
                                    >
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
                                <Dropdown
                                    menu={menuProps}
                                    className="border-none"
                                >
                                    <Button className="p-0">
                                        <Space>
                                            <Avatar
                                                size={30}
                                                src={userInfo?.photo}
                                            />
                                            {userInfo?.firstName +
                                                " " +
                                                userInfo?.lastName}
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

                        <li
                            className={`${
                                isAuthenticated ? "block" : "hidden"
                            }`}
                        >
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        {/* Autenticacion */}
                        {isAuthenticated ? (
                            <li className="w-full flex justify-center my-8">
                                <Button
                                    className="w-fit h-fit text-center border rounded-lg shadow-md px-8 py-2"
                                    onClick={() =>
                                        handleItemClick("/dashboard/profile")
                                    }
                                >
                                    <Space>
                                        <Avatar
                                            size={30}
                                            src={userInfo?.photo}
                                        />
                                        {userInfo?.firstName +
                                            " " +
                                            userInfo?.lastName}
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
