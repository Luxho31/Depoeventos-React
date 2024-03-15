import { SmileOutlined } from "@ant-design/icons";
import { Input, Progress, Tooltip } from "antd";
import { useState } from "react";
import PaymentStep from "./components/payment-step";
import 'animate.css';

export default function Cart() {
    const [progressPercent, setProgressPercent] = useState(0);

    return (
        <div className="flex flex-col w-[80%] m-auto mt-24">
            {/* Progress Bar */}
            <div className="w-full text-center">
                <div className={`${progressPercent === 0 ? "block" : "hidden"}`}>
                    <h1 className="animate__animated animate__backInDown">Resumen de Compra</h1>
                </div>
                <div className={`${progressPercent === 50 ? "block" : "hidden"}`}>
                    <h1 className="animate__animated animate__backInDown">Realizar Pago</h1>
                </div>
                <div className={`${progressPercent === 100 ? "block" : "hidden"}`}>
                    <h1 className="animate__animated animate__backInDown">Gracias por la Compra</h1>
                </div>
                <div
                    className="relative mt-8 mb-12"
                >
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

            {/* Table Cart */}
            <div className={`${progressPercent === 0 ? "block" : "hidden"} mb-24`}>
                <div className="mb-24">
                    <table className="w-full">
                        <thead>
                            <tr className="flex justify-around gap-12 leading-[60px]">
                                <th className="font-normal w-full">Producto</th>
                                <th className="font-normal w-full">Descripción</th>
                                <th className="font-normal w-full">Sede</th>
                                <th className="font-normal w-full">Categoría</th>
                                <th className="font-normal w-full">Alumno</th>
                                <th className="font-normal w-full">Precio</th>
                                {/* <button onClick={() => setProgressPercent(50)}>50%</button>
                            <button onClick={() => setProgressPercent(20)}>20%</button>
                            <button onClick={() => setProgressPercent(100)}>100%</button> */}
                            </tr>
                            <hr className="h-px bg-neutral-300" />
                        </thead>
                        <tbody>
                            <tr className="flex justify-around gap-12 leading-[60px]">
                                <td className="w-full text-center">Futbol</td>
                                <td className="w-full text-center">Aprende a jugar futbol</td>
                                <td className="w-full text-center">Colegio Villa Caritas</td>
                                <td className="w-full text-center">Lower</td>
                                <td className="w-full text-center">Juanito Perez</td>
                                <td className="w-full text-center">S/. 250</td>
                            </tr>
                            <tr className="flex justify-around gap-12 leading-[60px]">
                                <td className="w-full text-center">Voley</td>
                                <td className="w-full text-center">Aprende a jugar voley</td>
                                <td className="w-full text-center">Colegio Villa Caritas</td>
                                <td className="w-full text-center">Lower</td>
                                <td className="w-full text-center">Juanito Perez</td>
                                <td className="w-full text-center">S/. 250</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-around mb-24">
                    <div className="w-1/3 h-fit flex flex-col gap-y-4 border rounded-md shadow-md p-8">
                        <h2 className="text-lg">¿Tienes un cupón?</h2>
                        <h2 className="text-md text-neutral-500 font-extralight">Añade tu código para obtener un descuento instantáneo</h2>
                        <div className="w-full flex justify-center">
                            <Tooltip title="Proximamente..." placement="right">
                                <Input size="large" placeholder="Ingresa tu cupón" className="p-4" disabled />
                            </Tooltip>
                        </div>
                    </div>
                    <div className="w-1/3 h-72 flex flex-col justify-between border rounded-md shadow-md p-8">
                        <h2 className="text-lg">Cart Summary</h2>
                        <h2 className="text-2xl font-bold">Total S/. 500</h2>
                        <div className="w-full flex justify-center">
                            <button
                                className="w-[90%] bg-neutral-900 text-white rounded-md py-4 hover:bg-neutral-700"
                                onClick={() => setProgressPercent(50)}
                            >Pagar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pasarela de Pago */}
            <div className={`${progressPercent === 50 ? "block" : "hidden"} mb-24`}>
                <PaymentStep setNextStep={setProgressPercent} />
            </div>

            {/* Pasarela de Pago */}
            <div className={`${progressPercent === 100 ? "block" : "hidden"} mb-24`}>
                <h2>Hola</h2>
            </div>
        </div>
    );
}
