import { useEffect } from "react";

const data = [
  {
    id: 1,
    name: "Nike",
    photo:
      "https://imgs.search.brave.com/tvQHgDcnq50v3UgsxuW1e104vmgrjLhq1jo7u0KQK8k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5kZXNpZ25ydXNo/LmNvbS9pbnNwaXJh/dGlvbl9pbWFnZXMv/MTM0ODA1L2NvbnZl/cnNpb25zL18xNTEy/MDc2ODAzXzkzX05p/a2UtZGVza3RvcC5q/cGc",
  },
  {
    id: 2,
    name: "Adidas",
    photo:
      "https://imgs.search.brave.com/EeF0cUl_qWNWKHBodPsJshkf-I-QhO778urp1A7NwRY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saDYu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tLzRY/QVc5OFAyU0lHNTVF/X3N1T2VxM01vSnpR/eEltN19vNjUzSFJH/Q0VNTDVCUTRpdkQ2/azZ5UW90bmRkeHZy/dHBUOEVORXJoQmVE/U3pGaWJuSkp2MUFE/Sm8tMjg5aktxakFQ/VWx5ZmUxOER5VVlz/R0M5LVpyRVdYUklv/NUF0M1B2NWx4clFQ/dlAtUW1jQjBCTzR5/RlpoQThTVDZ1NFV1/Mm5CWC05WnV0aVBE/ZjBBR2lIU1BrenZJ/bzlJVEU5NXc",
  },
  {
    id: 3,
    name: "Puma",
    photo:
      "https://imgs.search.brave.com/djrbi4GvSGttYRisji4K29UL_62TdQ7PIKZKlysZQgc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGVzaWdueW91cndh/eS5uZXQvYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/OS9QVU1BLWxvZ28t/MS5qcGc",
  },
  {
    id: 4,
    name: "Vans",
    photo:
      "https://imgs.search.brave.com/EhVp5enyMPiIq0c6KIcBPMKZfQBWxt2pdTRLZ3_VZfc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA2/L3N5bWJvbC1WYW5z/LTUwMHgzMzQuanBn",
  },
  {
    id: 5,
    name: "Nike",
    photo:
      "https://imgs.search.brave.com/tvQHgDcnq50v3UgsxuW1e104vmgrjLhq1jo7u0KQK8k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5kZXNpZ25ydXNo/LmNvbS9pbnNwaXJh/dGlvbl9pbWFnZXMv/MTM0ODA1L2NvbnZl/cnNpb25zL18xNTEy/MDc2ODAzXzkzX05p/a2UtZGVza3RvcC5q/cGc",
  },
  {
    id: 6,
    name: "Adidas",
    photo:
      "https://imgs.search.brave.com/EeF0cUl_qWNWKHBodPsJshkf-I-QhO778urp1A7NwRY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saDYu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tLzRY/QVc5OFAyU0lHNTVF/X3N1T2VxM01vSnpR/eEltN19vNjUzSFJH/Q0VNTDVCUTRpdkQ2/azZ5UW90bmRkeHZy/dHBUOEVORXJoQmVE/U3pGaWJuSkp2MUFE/Sm8tMjg5aktxakFQ/VWx5ZmUxOER5VVlz/R0M5LVpyRVdYUklv/NUF0M1B2NWx4clFQ/dlAtUW1jQjBCTzR5/RlpoQThTVDZ1NFV1/Mm5CWC05WnV0aVBE/ZjBBR2lIU1BrenZJ/bzlJVEU5NXc",
  },
  {
    id: 7,
    name: "Puma",
    photo:
      "https://imgs.search.brave.com/djrbi4GvSGttYRisji4K29UL_62TdQ7PIKZKlysZQgc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGVzaWdueW91cndh/eS5uZXQvYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/OS9QVU1BLWxvZ28t/MS5qcGc",
  },
  {
    id: 8,
    name: "Vans",
    photo:
      "https://imgs.search.brave.com/EhVp5enyMPiIq0c6KIcBPMKZfQBWxt2pdTRLZ3_VZfc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA2/L3N5bWJvbC1WYW5z/LTUwMHgzMzQuanBn",
  },
];

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
  const handleLoadIsShowed = async () => {
    // const response = await getAllApprovedVideos();
    // setData(response);
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
          {data.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
