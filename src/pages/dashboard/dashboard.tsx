import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
import { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

import type { MenuProps } from "antd";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "sonner";
import LogoIcon from "../../assets/image/logo.png";
import { useAuth } from "../../context/AuthProvider";

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const { isAuthenticated, logout, cargando, userRole, userInfo } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Inicio",
      onClick: () => handleItemClick("/dashboard"),
      role: ["ADMIN", "USER", "TEACHER"],
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Disciplinas",
      onClick: () => handleItemClick("/dashboard/disciplines"),
      role: ["ADMIN"],
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: "Productos FALTA",
      onClick: () => handleItemClick("/dashboard/products"),
      role: ["ADMIN"],
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Usuarios",
      onClick: () => handleItemClick("/dashboard/users"),
      role: ["ADMIN"],
    },
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "Hijos FALTA",
      onClick: () => handleItemClick("/dashboard/childrens"),
      role: ["USER"],
    },
    {
      key: "6",
      icon: <UploadOutlined />,
      label: "Cursos Matriculados FALTA",
      onClick: () => handleItemClick("/dashboard/courses"),
      role: ["USER"],
    },
    {
      key: "7",
      icon: <UploadOutlined />,
      label: "Matriculas FALTA",
      onClick: () => handleItemClick("/dashboard/registrations"),
      role: ["ADMIN"],
    },
    {
      key: "8",
      icon: <UploadOutlined />,
      label: "Transacciones FALTA",
      onClick: () => handleItemClick("/dashboard/transactions"),
      role: ["ADMIN", "USER"],
    },
    {
      key: "9",
      icon: <UploadOutlined />,
      label: "Sedes",
      onClick: () => handleItemClick("/dashboard/campuses"),
      role: ["ADMIN"],
    },
    {
      key: "10",
      icon: <UploadOutlined />,
      label: "Categorias",
      onClick: () => handleItemClick("/dashboard/categories"),
      role: ["ADMIN"],
    },
  ];

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
        <Layout className="h-screen">
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div>
              {collapsed ? (
                <Link
                  to={"/"}
                  className="w-full flex justify-center items-center py-4 cursor-pointer"
                >
                  <img src={LogoIcon} alt="DepoEventos" className="w-8" />
                </Link>
              ) : (
                <Link
                  to={"/"}
                  className="w-full flex justify-center items-center py-4 cursor-pointer"
                >
                  <img src={LogoIcon} alt="DepoEventos" className="w-8" />
                  <h2 className="ms-2 text-lg text-white font-semibold">
                    Depo<span className="text-orange-500">Eventos</span>
                  </h2>
                </Link>
              )}
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={filteredMenuItems.map((item) => ({
                ...item,
                onClick: () => item.onClick(),
              }))}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                width: "100%",
              }}
            >
              <div className="flex justify-between items-center">
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
                <Dropdown menu={menuProps} className="border-none me-10">
                  <Button className="p-0">
                    <Space>
                      <Avatar size={30} icon={<UserOutlined />} />
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
