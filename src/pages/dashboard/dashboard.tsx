import { Link, Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';

import LogoIcon from "../../assets/image/logo.png"

const { Header, Sider, Content } = Layout;

export default function Dashboard() {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    const handleItemClick = (path: string) => {
        console.log('Navegando a:', path); // Agregar console.log para depurar
        navigate(path);
    };

    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'Pagina 1',
            onClick: () => handleItemClick('/dashboard')
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'Pagina 2',
            onClick: () => handleItemClick('/dashboard/paginaDos')
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
            onClick: () => handleItemClick('/')
        },
    ];

    return (
        <Layout className='h-screen'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div>
                    {collapsed ?
                        <Link to={"/"} className="w-full flex justify-center items-center py-4 cursor-pointer">
                            <img
                                src={LogoIcon}
                                alt="DepoEventos"
                                className="w-8"
                            />
                        </Link>
                        :
                        <Link to={"/"} className="w-full flex justify-center items-center py-4 cursor-pointer">
                            <img
                                src={LogoIcon}
                                alt="DepoEventos"
                                className="w-8"
                            />
                            <h2 className="ms-2 text-lg text-white font-semibold">
                                Depo<span className="text-orange-500">Eventos</span>
                            </h2>
                        </Link>
                    }
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={menuItems.map(item => ({
                        ...item,
                        onClick: () => item.onClick()
                    }))}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, width: "100%" }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
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
    )
}