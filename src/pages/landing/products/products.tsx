import { useState } from "react";
import CardProduct from "../../../components/card-product/card-product";
import ModalProduct from "../../../components/modal-product/modal-product";

export default function Products() {
  // const SkeletonOne = () => {
  //   return (
  //     <div>
  //       <p className="font-bold text-4xl text-white">House in the woods</p>
  //       <p className="font-normal text-base text-white"></p>
  //       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
  //         A serene and tranquil retreat, this house in the woods offers a peaceful
  //         escape from the hustle and bustle of city life.
  //       </p>
  //     </div>
  //   );
  // };

  // const SkeletonTwo = () => {
  //   return (
  //     <div>
  //       <p className="font-bold text-4xl text-white">House above the clouds</p>
  //       <p className="font-normal text-base text-white"></p>
  //       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
  //         Perched high above the world, this house offers breathtaking views and a
  //         unique living experience. It&apos;s a place where the sky meets home,
  //         and tranquility is a way of life.
  //       </p>
  //     </div>
  //   );
  // };
  // const SkeletonThree = () => {
  //   return (
  //     <div>
  //       <p className="font-bold text-4xl text-white">Greens all over</p>
  //       <p className="font-normal text-base text-white"></p>
  //       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
  //         A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
  //         perfect place to relax, unwind, and enjoy life.
  //       </p>
  //     </div>
  //   );
  // };
  // const SkeletonFour = () => {
  //   return (
  //     <div>
  //       <p className="font-bold text-4xl text-white">Rivers are serene</p>
  //       <p className="font-normal text-base text-white"></p>
  //       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
  //         A house by the river is a place of peace and tranquility. It&apos;s the
  //         perfect place to relax, unwind, and enjoy life.
  //       </p>
  //     </div>
  //   );
  // };

  // const cards = [
  //   {
  //     id: 1,
  //     content: <SkeletonOne />,
  //     className: "md:col-span-1",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 2,
  //     content: <SkeletonTwo />,
  //     className: "col-span-1",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 3,
  //     content: <SkeletonThree />,
  //     className: "col-span-1",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 4,
  //     content: <SkeletonFour />,
  //     className: "md:col-span-1",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];

  type Product = {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    // Otros campos del producto desde el backend
  };

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock data, puedes reemplazarlo con los datos del backend
  const products: Product[] = [
    {
      id: 1,
      image:
        "https://www.pngall.com/wp-content/uploads/2016/07/Tom-And-Jerry-PNG.png",
      title: "Producto 1",
      price: 100,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/originals/4a/bd/c4/4abdc4727c2029fc1ba336742eec954a.png",
      title: "Producto 2",
      price: 650,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
    {
      id: 3,
      image: "https://fcbk.su/_data/stickers/regular_show/regular_show_00.png",
      title: "Producto 3",
      price: 240,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/originals/17/37/21/173721246ff8546baedb7ef457f9d2c1.png",
      title: "Producto 4",
      price: 250,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
    {
      id: 5,
      image:
        "https://i.pinimg.com/originals/b6/e3/91/b6e391a89ea14a449782a54317dfde32.png",
      title: "Producto 5",
      price: 920,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
    {
      id: 6,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/32a444f6-6389-4360-b323-9e1890d5db5a/dgo1afb-5708707f-0607-4388-b7cd-044a990aa507.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMyYTQ0NGY2LTYzODktNDM2MC1iMzIzLTllMTg5MGQ1ZGI1YVwvZGdvMWFmYi01NzA4NzA3Zi0wNjA3LTQzODgtYjdjZC0wNDRhOTkwYWE1MDcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5ZQNGLpGfYjLkNIPZt8JQ8xkjmW6Ph5yyYCvPIIRBcE",
      title: "Producto 6",
      price: 330,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
    {
      id: 7,
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/78c4ffab-6cb6-45c3-baaa-347c559cb50e/d492bql-1cb4fcbc-6590-4ef9-ac94-8cbc02860ff5.png/v1/fill/w_1600,h_1775/kid_vs__kat_ii_by_achaitanya_d492bql-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTc3NSIsInBhdGgiOiJcL2ZcLzc4YzRmZmFiLTZjYjYtNDVjMy1iYWFhLTM0N2M1NTljYjUwZVwvZDQ5MmJxbC0xY2I0ZmNiYy02NTkwLTRlZjktYWM5NC04Y2JjMDI4NjBmZjUucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.0LP3ORINS3GblCdxKIdiARcZRLfEKeVnN5RRl0turqw",
      title: "Producto 7",
      price: 180,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
    {
      id: 8,
      image:
        "https://img1.picmix.com/output/stamp/normal/7/4/1/8/1668147_ff37a.png",
      title: "Producto 8",
      price: 470,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptas, repellat, possimus atque repellendus accusamus eos quis blanditiis deserunt natus iure similique reiciendis rem mollitia eveniet vitae qui quam autem.",
      // Otros campos del producto desde el backend
    },
  ];

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    // <div className='mt-20 w-[80%] m-auto'>
    //   <h1 className='p-5'>Productos</h1>
    //   <CardProduct />
    //   {/* <LayoutGrid cards={cards} /> */}
    // </div>

    <div className="mt-20 w-[80%] m-auto">
      <h1 className="text-3xl font-bold mb-8">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
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
