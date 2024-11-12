import { Collapse, CollapseProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

export const FaqSection = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "¿Cómo puedo hacer una compra?",
      children: (
        <p>
          Para hacer una compra, debes seguir los siguientes pasos:
          <ol className="list-decimal list-inside ml-4">
            <li>Selecciona los productos que deseas comprar.</li>
            <li>Ve al carrito de compras.</li>
            <li>Ingresa tus datos de envío.</li>
            <li>Selecciona el método de pago.</li>
            <li>Confirma tu compra.</li>
          </ol>
        </p>
      ),
    },
    {
      key: "2",
      label: "¿Cuál es el tiempo de envío?",
      children: <p>Los envíos pueden demorar de 3 a 7 días hábiles.</p>,
    },
    {
      key: "3",
      label: "¿Cuál es la política de devoluciones?",
      children: <p>Puedes devolver los productos en un plazo de 30 días.</p>,
    },
    {
      key: "4",
      label: "¿Ofrecen soporte técnico?",
      children: <p>Sí, ofrecemos soporte técnico 24/7.</p>,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Preguntas Frecuentes
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Aquí encontrarás respuestas a las preguntas más comunes.
        </p>
      </div>

      <div className="w-[80%] lg:w-[60%] mt-8">
        <Collapse
          accordion
          items={items}
          className="bg-white shadow-lg rounded-md overflow-hidden"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};
