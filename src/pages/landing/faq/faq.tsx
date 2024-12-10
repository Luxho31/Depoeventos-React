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

import contactUsIMG from "../../../assets/auth/contactUsIMG.jpg";

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
      <div>
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
          <p className="text-gray-500">
            No hay contenido disponible para esta sección.
          </p>
        )}
      </div>
    ),
  }));
};

export const FaqSection = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:space-x-8 max-sm:mt-8 mt-8">
      {/* Sección de FAQ */}
      <div className="w-full lg:w-2/3 px-4 sm:px-8 lg:px-12 py-8 lg:py-16 flex flex-col justify-center gap-y-4 h-screen">
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center lg:text-left">
            Preguntas frecuentes
          </h1>
          <p className="text-center lg:text-left mt-4 text-gray-600">
            Encuentra respuestas a las preguntas más frecuentes de nuestros
            usuarios. Si no encuentras lo que buscas, no dudes en contactarnos.
          </p>
        </div>
        <Tabs
          defaultActiveKey="1"
          items={generateTabsItems()}
          className="rounded-lg bg-white shadow-md"
        />
      </div>

      {/* Imagen */}
      <div className="w-full lg:w-1/4  lg:flex justify-center mt-8 lg:mt-0 hidden ">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-200 rounded-xl transform -translate-x-4 translate-y-4 lg:translate-x-0 lg:-translate-y-8 w-full h-full -z-10 shadow-xl"></div>
          <img
            src={contactUsIMG}
            alt="Contacto y soporte"
            className="rounded-xl w-4/5 sm:w-3/4 lg:w-full object-cover shadow-lg transition-transform hover:scale-105 duration-300"
          />
        </div>
      </div>
    </div>
  );
};
