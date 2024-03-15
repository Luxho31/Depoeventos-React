import React, { useState } from "react";
import { FaInbox, FaRegTrashCan } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

export default function CartTable() {

    type ProductsType = {
        id: number,
        name: string,
        children: string,
        price: number,
        image: string // Agrega la propiedad image al tipo de producto
    }

    const [products, setProducts] = useState<ProductsType[]>([
        {
            id: 1,
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp', // Agrega la URL de la imagen del producto
            name: 'Apple AirPods Pro',
            children: "Juan Rodriguez",
            price: 249.99,
        },
        {
            id: 2,
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp', // Agrega la URL de la imagen del producto
            name: 'Apple AirPods Max',
            children: "Luis Sánchez",
            price: 549.99,
        },
        {
            id: 3,
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp', // Agrega la URL de la imagen del producto
            name: 'Apple HomePod mini',
            children: "Diego Cedrón",
            price: 999.99,
        },
        {
            id: 4,
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp', // Agrega la URL de la imagen del producto
            name: 'Apple HomePod mini',
            children: "Diego Cedrón",
            price: 999.99,
        },
        {
            id: 5,
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp', // Agrega la URL de la imagen del producto
            name: 'Apple HomePod mini',
            children: "Diego Cedrón",
            price: 999.99,
        },
        {
            id: 6,
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp', // Agrega la URL de la imagen del producto
            name: 'Apple HomePod mini',
            children: "Diego Cedrón",
            price: 999.99,
        },
    ]);

    const handleRemoveProduct = (productId: number) => {
        setProducts(products.filter((product) => product.id !== productId));
    };

    const handleAddProduct = (productId: number) => {
        const product = products.find((product) => product.id === productId);
        if (product) {
            setProducts(prevProducts => prevProducts.map(prevProduct =>
                prevProduct.id === productId ? { ...prevProduct, count: prevProduct.count + 1 } : prevProduct
            ));
        }
    };

    const getTotalPrice = () => {
        return products.reduce((total, product) => {
            if (typeof product.price === 'number') {
                return total + product.price;
            } else {
                return total;
            }
        }, 0);
    };

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
                        <button className="bg-transparent text-red-500 flex items-center p-2 rounded mb-4" onClick={() => setProducts([])}>
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
                                <img src={product.image} alt={product.name} className="!w-20 !h-auto bg-gray-300 rounded-xl" />
                            </div>
                            <div className="w-1/4">
                                <h2 className="text-lg">{product.name}</h2>
                            </div>
                            <div className="w-1/4">
                                <h2 className="text-lg font-light text-center">{product.children}</h2>
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