import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps, TabsProps } from "antd";
import { Collapse, Tabs } from "antd";
import {
  contacto,
  cursoTaller,
  devoluciones,
  generalidades,
  gestionHijos,
  inscripcionTalleres,
  mediosPago,
  registroCuenta,
} from "../../../assets/faq/questions_answers";

const sections = [
  { key: "1", label: "Inicio", data: generalidades },
  { key: "2", label: "Registro y cuenta", data: registroCuenta },
  { key: "3", label: "Gestión de hijos", data: gestionHijos },
  { key: "4", label: "Inscripciones", data: inscripcionTalleres },
  { key: "5", label: "Medios de pago", data: mediosPago },
  { key: "6", label: "Cursos y talleres", data: cursoTaller },
  { key: "7", label: "Devoluciones", data: devoluciones },
  { key: "8", label: "Contacto y soporte", data: contacto },
];

const generateCollapseItems = (data: any[]): CollapseProps["items"] => {
  return data.map((faq) => ({
    key: faq.key.toString(),
    label: faq.question,
    children: (
      <ul className="list-disc list-inside ml-4 space-y-2">
        {faq.answer.map((line: string, index: number) => (
          <li key={index} className="text-gray-700">
            {line}
          </li>
        ))}
      </ul>
    ),
  }));
};

const generateTabsItems = (): TabsProps["items"] => {
  return sections.map((section) => ({
    key: section.key,
    label: section.label,
    children: (
      <div className="p-6 mx-4 sm:mx-6 lg:mx-16">
        {section.data.length > 0 ? (
          <Collapse
            accordion
            items={generateCollapseItems(section.data)}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                rotate={isActive ? 90 : 0}
                className="text-blue-600"
              />
            )}
          />
        ) : (
          <p className="text-gray-500 text-center">
            No hay contenido disponible para esta sección.
          </p>
        )}
      </div>
    ),
  }));
};

export const FaqSection = () => {
  return (
    <div className="h-screen mt-8 w-full flex flex-col items-center py-8 px-4 sm:px-6 lg:px-16">
      <div className="text-center mt-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
          Preguntas frecuentes
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Encuentra respuestas a las preguntas más frecuentes de nuestros
          usuarios. Si no encuentras lo que buscas, no dudes en contactarnos.
        </p>
      </div>
      <div className="w-full">
        <Tabs
          defaultActiveKey="1"
          items={generateTabsItems()}
          className="rounded-lg shadow-lg p-4 sm:p-8 lg:p-10"
          animated
        />
      </div>
    </div>
  );
};
