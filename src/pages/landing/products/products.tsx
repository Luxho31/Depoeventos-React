import { useEffect, useState } from "react";
import CardProduct from "../../../components/card-product/card-product";
import ModalProduct from "../../../components/modal-product/modal-product";
import { getAllProducts } from "../../../services/products-service";
import { getAllDisciplines } from "../../../services/disciplines-service";
import { Spin } from "antd";
import { useAuth } from "../../../context/AuthProvider";

type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  product: {
    name: string;
    price: number;
    image: string;
  };
  children: {
    name: string;
  };
};

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProductData(data)
      // setLoading(false);
    }).catch(error => {
      console.error("Error al obtener disciplinas:", error);
      // setLoading(false);
    });
  }, [])

  // const products: Product[] = [
  //   {
  //     id: 1,
  //     image: "https://via.placeholder.com/150",
  //     title: "English",
  //     price: 100,
  //     description: "Descripción del producto 1",
  //     product: {
  //       name: "English",
  //       price: 100,
  //       image: "https://via.placeholder.com/150",
  //     },
  //     children: {
  //       name: "Alumno 1",
  //     },
  //   },
  //   {
  //     id: 2,
  //     image: "https://via.placeholder.com/150",
  //     title: "Producto 2",
  //     price: 200,
  //     description: "Descripción del producto 2",
  //     product: {
  //       name: "Producto 2",
  //       price: 200,
  //       image: "https://via.placeholder.com/150",
  //     },
  //     children: {
  //       name: "Alumno 2",
  //     },
  //   },
  //   {
  //     id: 3,
  //     image: "https://via.placeholder.com/150",
  //     title: "Producto 3",
  //     price: 300,
  //     description: "Descripción del producto 3",
  //     product: {
  //       name: "Producto 3",
  //       price: 300,
  //       image: "https://via.placeholder.com/150",
  //     },
  //     children: {
  //       name: "Alumno 3",
  //     },
  //   },
  //   {
  //     id: 4,
  //     image: "https://via.placeholder.com/150",
  //     title: "Producto 4",
  //     price: 400,
  //     description: "Descripción del producto 4",
  //     product: {
  //       name: "Producto 4",
  //       price: 400,
  //       image: "https://via.placeholder.com/150",
  //     },
  //     children: {
  //       name: "Alumno 4",
  //     },
  //   },
  // ];

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="mt-20 w-[80%] m-auto">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productData.map((product:any) => (
          <CardProduct
            key={product.id}
            product={product}
            onClick={() => handleCardClick(product)}
          />
        ))}
      </div>
      {selectedProduct && (
        <ModalProduct product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
