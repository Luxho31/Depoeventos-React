import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Spin,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import type { MenuProps } from "antd";
import { CiBadgeDollar, CiSettings, CiStar, CiWarning } from "react-icons/ci";
import {
  FaBookOpen,
  FaBuilding,
  FaChevronLeft,
  FaPhotoVideo,
  FaSchool,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping, FaChildren } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import {
  IoDocumentTextOutline,
  IoHome,
  IoSchoolOutline,
} from "react-icons/io5";
import { MdChecklistRtl, MdOutlineSportsFootball } from "react-icons/md";
import { toast } from "sonner";
import LogoIcon from "../../assets/image/logo.png";
import { useAuth } from "../../context/AuthProvider";
import { GrSchedule } from "react-icons/gr";
import { RiAlarmWarningLine } from "react-icons/ri";

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const { isAuthenticated, logout, cargando, userRole, userInfo } = useAuth();
  const [redirectToHome, setRedirectToHome] = useState(false);
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !cargando) {
      setRedirectToHome(true);
    }
  }, [isAuthenticated, cargando]);

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  // Función para manejar el cambio en el tamaño de la ventana
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = (path: string) => {
    navigate(path);
    setCollapsed(true);
  };

  const menuItems = [
    {
      key: "1",
      path: "/dashboard",
      icon: <IoHome />,
      label: "Inicio",
      onClick: () => handleItemClick("/dashboard"),
      role: ["ADMIN", "USER", "TEACHER"],
    },
    {
      key: "2",
      path: "/dashboard/disciplines",
      icon: <MdOutlineSportsFootball />,
      label: "Disciplinas",
      onClick: () => handleItemClick("/dashboard/disciplines"),
      role: ["ADMIN"],
    },
    {
      key: "3",
      path: "/dashboard/products",
      icon: <CiBadgeDollar />,
      label: "Productos",
      onClick: () => handleItemClick("/dashboard/products"),
      role: ["ADMIN"],
    },
    {
      key: "4",
      path: "/dashboard/users",
      icon: <FaUser />,
      label: "Usuarios",
      onClick: () => handleItemClick("/dashboard/users"),
      role: ["ADMIN"],
    },
    {
      key: "5",
      path: "/dashboard/childrens",
      icon: <FaChildren />,
      label: "Hijos",
      onClick: () => handleItemClick("/dashboard/childrens"),
      role: ["ADMIN", "USER"],
    },
    {
      key: "6",
      path: "/dashboard/courses",
      icon: <UploadOutlined />,
      label: "Cursos",
      onClick: () => handleItemClick("/dashboard/courses"),
      role: ["ADMIN", "USER"],
    },
    {
      key: "7",
      path: "/dashboard/registrations",
      icon: <IoDocumentTextOutline />,
      label: "Matriculas",
      onClick: () => handleItemClick("/dashboard/registrations"),
      role: ["ADMIN"],
    },
    {
      key: "8",
      path: "/dashboard/transactions",
      icon: <FaCartShopping />,
      label: "Transacciones",
      onClick: () => handleItemClick("/dashboard/transactions"),
      role: ["ADMIN"],
    },
    {
      key: "9",
      path: "/dashboard/campuses",
      icon: <FaSchool />,
      label: "Sedes",
      onClick: () => handleItemClick("/dashboard/campuses"),
      role: ["ADMIN"],
    },
    {
      key: "10",
      path: "/dashboard/categories",
      icon: <IoSchoolOutline />,
      label: "Categorias",
      onClick: () => handleItemClick("/dashboard/categories"),
      role: ["ADMIN"],
    },
    {
      key: "11",
      path: "/dashboard/schedule",
      icon: <GrSchedule />,
      label: "Horario",
      onClick: () => handleItemClick("/dashboard/schedule"),
      role: ["ADMIN", "USER"],
      // disabled: true,
    },
    {
      key: "12",
      path: "/dashboard/testimonials",
      icon: <CiStar />,
      label: "Testimonios",
      onClick: () => handleItemClick("/dashboard/testimonials"),
      role: ["ADMIN"],
    },
    {
      key: "13",
      path: "/dashboard/complaints-book",
      icon: <FaBookOpen />,
      label: "Reclamaciones",
      onClick: () => handleItemClick("/dashboard/complaints-book"),
      role: ["ADMIN"],
    },
    {
      key: "14",
      path: "/dashboard/videos",
      icon: <FaPhotoVideo />,
      label: "Videos",
      onClick: () => handleItemClick("/dashboard/videos"),
      role: ["ADMIN"],
    },
    {
      key: "15",
      path: "/dashboard/assists",
      icon: <MdChecklistRtl />,
      label: "Asistencias",
      onClick: () => handleItemClick("/dashboard/assists"),
      role: ["TEACHER", "ADMIN"],
    },
    {
      key: "16",
      path: "/dashboard/incidents",
      icon: <CiWarning />,
      label: "Incidentes generales",
      onClick: () => handleItemClick("/dashboard/incidents"),
      role: ["ADMIN"],
    },
    {
      key: "17",
      path: "/dashboard/incidents-teachers",
      icon: <RiAlarmWarningLine />,
      label: "Incidentes profesores",
      onClick: () => handleItemClick("/dashboard/incidents-teachers"),
      role: ["TEACHER", "ADMIN"],
    },
    {
      key: "18",
      path: "/dashboard/trusted-companies",
      icon: <FaBuilding />,
      label: "Empresas de confianza",
      onClick: () => handleItemClick("/dashboard/trusted-companies"),
      role: ["ADMIN"],
    },
    {
      key: "19",
      path: "/dashboard/courses-with-children",
      icon: <FaChildren />,
      label: "Transferencias",
      onClick: () => handleItemClick("/dashboard/courses-with-children"),
      role: ["ADMIN"],
    },
    {
      key: "20",
      path: "/dashboard/returns",
      icon: <FaCartShopping />,
      label: "Devoluciones",
      onClick: () => handleItemClick("/dashboard/returns"),
      role: ["ADMIN"],
    },
    {
      key: "21",
      path: "/dashboard/configuration",
      icon: <CiSettings />,
      label: "Configuración",
      onClick: () => handleItemClick("/dashboard/configuration"),
      role: ["ADMIN"],
    },
  ];

  const selectedItem = menuItems.find(
    (item) => item.path === location.pathname
  );

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

  if (!userRole) {
    return null;
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.role.some((allowedRole) => userRole.includes(allowedRole))
  );

  if (cargando) return <Spin fullscreen />;

  return (
    <>
      {isAuthenticated ? (
        <Layout className="h-screen relative">
          {!collapsed && (
            <div
              className={`${
                windowWidth <= 768
                  ? "fixed inset-0 bg-black opacity-50 z-40"
                  : "hidden"
              }`}
              onClick={() => setCollapsed(true)}
            ></div>
          )}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="md" // Define el breakpoint en el que el sidebar se colapsará
            collapsedWidth={collapsed && windowWidth <= 768 ? 0 : undefined} // Se establece en 0 cuando colapsado y la pantalla es menor que md, de lo contrario, se deja sin definir
            className={
              windowWidth >= 768
                ? "fixed z-50"
                : `!fixed ${
                    collapsed && "z-50"
                  } top-0 left-0 h-screen relative z-50`
            }
            onBreakpoint={(broken) => {
              if (broken) {
                setCollapsed(true); // Oculta el sidebar cuando el breakpoint se activa
              }
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
              className="overflow-y-auto"
            >
              <div>
                {collapsed ? (
                  <Link
                    to={"/"}
                    className="w-full flex justify-center items-center py-4 cursor-pointer"
                  >
                    <img src={LogoIcon} alt="DepoEventos" className="w-8" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to={"/"}
                      className="w-full flex justify-center items-center py-4 cursor-pointer"
                    >
                      <img src={LogoIcon} alt="DepoEventos" className="w-8" />
                      <h2 className="ms-2 text-lg text-white font-semibold">
                        Depo
                        <span className="text-orange-500">Eventos</span>
                      </h2>
                    </Link>
                    <button
                      onClick={() => {
                        setCollapsed(true);
                      }}
                      className={`${
                        windowWidth >= 768
                          ? "hidden"
                          : "bg-[#001529] absolute rounded-tr-full rounded-br-full px-2 text-white h-10 -right-7 top-3"
                      }`}
                    >
                      <FaChevronLeft className="text-lg" />
                    </button>
                  </>
                )}
              </div>
              <Menu
                theme="dark"
                mode="inline"
                //   defaultSelectedKeys={["1"]}
                selectedKeys={[selectedItem?.key || ""]}
                items={filteredMenuItems.map((item) => ({
                  ...item,
                  onClick: () => item.onClick(),
                }))}
              />
              <div
                className={`${
                  windowWidth >= 640 ? "hidden" : "block"
                } flex justify-center gap-2 mt-auto mb-4`}
              >
                <Button
                  className="border-none h-12 p-2 bg-white rounded-lg"
                  onClick={() => handleItemClick("/dashboard/profile")}
                >
                  <Space>
                    <Avatar size={30} src={userInfo?.photo} />
                    {userInfo?.firstName + " " + userInfo?.lastName}
                  </Space>
                </Button>
                <button
                  className="p-2 rounded-lg duration-300 hover:bg-red-400"
                  onClick={() => handleLogout()}
                >
                  <IoIosLogOut className="text-xl text-white" />
                </button>
              </div>
            </div>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                width: "100%",
              }}
            >
              <div
                className={`flex justify-between items-center max-sm:fixed ${
                  collapsed ? "max-sm:bg-white" : "max-sm:bg-transparent"
                } max-sm:z-40 max-sm:w-full`}
              >
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <Dropdown
                  menu={menuProps}
                  className="hidden sm:block sm:border-none sm:me-10"
                >
                  <Button className="p-0">
                    <Space>
                      <Avatar size={30} src={userInfo?.photo} />
                      {userInfo?.firstName + " " + userInfo?.lastName}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                overflow: "auto",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
