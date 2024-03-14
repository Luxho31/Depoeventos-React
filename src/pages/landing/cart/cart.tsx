import { SmileOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { useState } from "react";

export default function Cart() {
  const [progressPercent, setProgressPercent] = useState(30);
  return (
    <div className="h-[93vh] flex flex-col w-[80%] m-auto my-16">
      <div className="w-full text-center mb-10">
        <h1>Resumen de Compra</h1>
        <div style={{ position: "relative" }}>
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
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="flex justify-around gap-12 leading-10">
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Hola</th>
              <button onClick={() => setProgressPercent(50)}>50%</button>
              <button onClick={() => setProgressPercent(20)}>20%</button>
              <button onClick={() => setProgressPercent(100)}>100%</button>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
