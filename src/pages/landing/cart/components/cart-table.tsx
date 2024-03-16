import React, { useState } from "react";
import { FaInbox, FaRegTrashCan } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useCart } from "../../../../context/CartProvider";

export default function CartTable() {

    const { products, getTotalPrice } = useCart();
    type ProductsType = {
        id: number,
        name: string,
        children: string,
        price: number,
        image: string // Agrega la propiedad image al tipo de producto
    }



    // const handleRemoveProduct = (productId: number) => {
    //     setProducts(productes.filter((product) => product.id !== productId));
    // };

    // const handleAddProduct = (productId: number) => {
    //     const product = products.find((product) => product.id === productId);
    //     if (product) {
    //         setProducts(prevProducts => prevProducts.map(prevProduct =>
    //             prevProduct.id === productId ? { ...prevProduct, count: prevProduct.count + 1 } : prevProduct
    //         ));
    //     }
    // };



    return (
        <div className="border rounded-3xl shadow-md p-8">
            <div className="flex justify-between">
                <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-semibold me-2">Carrito</h2>
                    <span className="text-gray-400">({products.length} productos)</span>
                </div>
                {products.length == 0 ? (
                    <></>
                )
                    : (
                        <button className="bg-transparent text-red-500 flex items-center p-2 rounded mb-4">
                            <FaRegTrashCan className="me-2" />
                            <span>Limpiar carrito</span>
                        </button>
                    )}
            </div>
            <ul className="list-disc p-0">
                <li className="flex items-center p-2">
                    <div className="w-1/6">

                    </div>
                    <div className="w-1/4">
                        <h2 className="text-lg font-semibold">Producto</h2>
                    </div>
                    <div className="w-1/4">
                        <h2 className="text-lg font-semibold text-center">Alumno</h2>
                    </div>
                    <div className="w-1/6 text-right">
                        <p className="text-lg font-semibold">Precio</p>
                    </div>
                </li>
                <hr className="h-px bg-neutral-300 my-4" />
                {products.length == 0 ? (
                    <li className="list-none flex flex-col items-center gap-2 my-8">
                        <FaInbox className="text-8xl text-gray-200" />
                        <span className="text-gray-400">No hay elementos</span>
                    </li>
                ) : (
                    products.map((product) => (
                        <li key={product.id} className="flex items-center mb-4 border-2 rounded-xl p-2">
                            <div className="w-1/6">
                                <img src={product.image} alt={product.title} className="!w-20 !h-auto bg-gray-300 rounded-xl" />
                            </div>
                            <div className="w-1/4">
                                <h2 className="text-lg">{product.title}</h2>
                            </div>
                            <div className="w-1/4">
                                <h2 className="text-lg font-light text-center">ACA FALTA EL HIJO</h2>
                            </div>
                            <div className="w-1/6 text-right">
                                <p className="text-lg font-semibold">S/. {product.price}</p>
                            </div>
                            <div className="w-1/6 text-right flex justify-end">
                                <IoIosClose className="text-red-500 text-3xl cursor-pointer" />
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <hr className="mb-4" />
            <div className="flex justify-between items-center">
                <p className="text-gray-500">Total:</p>
                <p className="text-xl font-bold">S/. {getTotalPrice()}</p>
            </div>
        </div>
    )
}