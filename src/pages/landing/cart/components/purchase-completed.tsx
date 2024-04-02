import { SmileOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import VentaGIF from "../../../../assets/gif/ventas.gif";

export default function PurchaseCompleted() {
    const [progressPercent, setProgressPercent] = useState(100);

    return (
        <div className="flex flex-col w-[80%] m-auto mt-24">
            {/* Progress Bar */}
            <div className="w-full text-center">
                <div
                    className={`${
                        progressPercent === 100 ? "block" : "hidden"
                    }`}
                >
                    <h1 className="animate__animated animate__backInDown">
                        Compra realizada
                    </h1>
                </div>
                <div className="relative mt-8 mb-12">
                    <Progress percent={progressPercent} showInfo={false} />
                    <SmileOutlined
                        className="text-2xl"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: `calc(${progressPercent}% - 2px)`,
                            transform: "translateY(-50%)",
                            transition: "left 0.26s ease-in-out",
                        }}
                    />
                </div>
            </div>
            <div
                className={`${
                    progressPercent === 100 ? "block" : "hidden"
                } mb-24`}
            >
                <div className="h-[34rem] flex flex-col justify-center items-center gap-y-8 BackgroundMessage">
                    <img src={VentaGIF} className="w-60" alt="" />
                    <h2 className="text-4xl font-light">
                        Gracias por adquirir nuestros servicios
                    </h2>
                    <span className="text-lg text-center text-neutral-400">
                        Su compra ha sido registrada y se encuentra en proceso
                        de aprobación, se ha separado un cupo en los productos
                        que ha adquirido. <br />
                        Se envió un correo con los detalles de su compra.
                    </span>
                    <Link
                        to="/"
                        className="bg-indigo-400 text-white rounded-xl px-8 py-4 hover:bg-indigo-300"
                    >
                        Seguir Comprando
                    </Link>
                </div>
            </div>
        </div>
    );
}
