import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import LogoIcon from "../../../../assets/logo.png";

// React Icons
import { FaEnvelope, FaKey } from "react-icons/fa";

export default function Login() {

    type LoginType = {
        email?: string;
        password?: string;
    };

    const handleSignIn = async (values: any) => {
        try {
            console.log(values);
            //   await userApi.signIn(values.email, values.password);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex items-center w-full h-screen">
                <>
                    <img
                        className="w-1/4 h-screen object-cover max-md:hidden relative"
                        src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
                        alt=""
                    />
                    <Link
                        className="pointer flexNullCenter absolute top-5 left-5"
                        to="/"
                    //   smooth={true}
                    >
                        {/* <img
                        src={LogoIcon}
                        alt="DepoEventos"
                        style={{ width: "70px", marginBottom: "30px" }}
                        /> */}
                    </Link>
                </>

                <Form
                    name="login"
                    onFinish={handleSignIn}
                    onFinishFailed={() => {
                        console.log("Fallo");
                    }}
                    className="w-[750px] max-md:mx-20 md:mx-32"
                >
                    <h2 className="text-3xl text-center font-semibold mb-8">
                        Bienvenido a DepoEventos
                    </h2>

                    <div className="flex flex-col gap-y-2 mb-8">
                        {/* Input Email */}
                        <Form.Item<LoginType>
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor, ingresa tu correo electrónico.",
                                },
                                {
                                    type: "email",
                                    message: "Ingresa un correo electrónico válido.",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input
                                className="w-full rounded-xl p-4"
                                placeholder="Ingresa tu username"
                                size="large"
                                prefix={<FaEnvelope className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>

                        {/* Input Password */}
                        <Form.Item<LoginType>
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese su contraseña!",
                                },
                            ]}
                            className="cursor-text"
                        >
                            <Input.Password
                                className="w-full rounded-xl p-4"
                                placeholder="Ingresa tu contraseña"
                                size="large"
                                prefix={<FaKey className="site-form-item-icon me-1" />}
                            />
                        </Form.Item>
                    </div>

                    {/* Buttom */}
                    {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            className="bg-[#0D0C22] text-white font-semibold w-full border rounded-full"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item> */}

                    <Form.Item className="w-full">
                        <button
                            type="submit"
                            className="w-full bg-[#f46e16] text-white font-semibold rounded-xl p-4"
                        >
                            Iniciar Sesión
                        </button>
                    </Form.Item>

                    <p className=" text-center text-lg mt-8">
                        Don't have an account? {""}
                        <Link to="/register" className="text-gray-500">
                            Sign up
                        </Link>
                    </p>
                </Form>

                {/* <form action="" onSubmit={handleSubmit}> */}
            </div>
            {/* LOADER */}
            {/* <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={() => setLoading(false)}
          >
            <CircularProgress color="inherit" />
          </Backdrop> */}
            {/* LOADER */}
        </>
    );
}
