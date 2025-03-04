import { useEffect, useState } from "react";
import { getAllApprovedTrustedCompanies } from "../../../../services/trusted-companies-service";
import { Empty } from "antd";

export const Item = (data: any) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={data.photo} alt={data.name} className="w-28 h-24 opacity-75" />
      <p className="text-center mt-5 font-mono text-gray-500 tracking-wide">
        {data.name}
      </p>
    </div>
  );
};

export default function TrustedCompanies() {
  const [data, setData] = useState([]);
  const handleLoadIsShowed = async () => {
    const response = await getAllApprovedTrustedCompanies();
    setData(response);
  };

  useEffect(() => {
    handleLoadIsShowed();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[80%] m-auto mb-10 mt-20">
        <div className="mb-12">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            Empresas que confían en nosotros
          </h1>
          <p className="leading-6 text-justify">
            Nos enorgullece contar con la confianza de diversas empresas que
            valoran nuestro compromiso y dedicación.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 place-items-center gap-y-14">
          {data.length === 0 && (
            <Empty description="No hay empresas disponibles" />
          )}
          {data.map((item: any) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
