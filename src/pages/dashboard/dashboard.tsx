import { Link, Outlet } from "react-router-dom"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';

const { Header, Sider, Content } = Layout;

export default function Dashboard() {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (

        <Layout className='h-screen'>
            <Header style={{ padding: 0, background: colorBgContainer, width: "100%", position: "sticky", top: 0 }}>
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
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ position: "fixed", height: "100vh" }}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    // items={[
                    //     {
                    //         key: '1',
                    //         icon: <UserOutlined />,
                    //         label: 'Pagina 1',
                    //     },
                    //     {
                    //         key: '2',
                    //         icon: <VideoCameraOutlined />,
                    //         label: 'Pagina 2',
                    //     },
                    //     {
                    //         key: '3',
                    //         icon: <UploadOutlined />,
                    //         label: 'nav 3',
                    //     },
                    // ]}
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/dashboard/paginaUno">Pagina 1</Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/dashboard/paginaDos">Pagina 2</Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/">Pagina 2</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content
                    style={{
                        margin: '24px 16px',
                        marginLeft: "11.5%",
                        padding: 24,
                        minHeight: 280,
                        maxWidth: "100%",
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
