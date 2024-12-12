import { LoadingOutlined } from "@ant-design/icons";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Checkbox, Form, Input, Spin } from "antd";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import contactUsIMG from "../../../assets/auth/contactUsIMG.jpg";
import Terminos from "../../../assets/pdf/tyc.pdf";
import Politicas from "../../../assets/pdf/politica_de_privacidad.pdf";

import { createTestimonial } from "../../../services/opinions-service";

export default function Opinions() {
  const { TextArea } = Input;

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const [disableButton, setDisableButton] = useState(true);

  const handleSendMessage = async (values: any) => {
    try {
      setLoading(true);
      const body = {
        fullName: values.fullName,
        rating: rating,
        testimonial: values.testimonial,
      };
      await createTestimonial(body);
      toast.success("Testimonio enviado correctamente");
      setRating(0);
    } catch (error) {
      toast.error("Error al enviar testimonio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse justify-center items-center lg:pt-10">
      <Toaster richColors />
      <div className="lg:w-1/2 px-4 lg:px-0 pt-12 lg:pt-0 max-sm:pt-0">
        <div className="max-w-lg mx-auto mb-7">
          <h1 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
            Evalúa nuestro servicio
          </h1>
          <p className="text-center lg:text-left">
            Anímate! y cuéntanos tu experiencia con nosotros.
          </p>
        </div>

        <Form
          name="contact-us"
          onFinish={handleSendMessage}
          onFinishFailed={() => {}}
          className="max-w-lg mx-auto"
        >
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese tu nombre completo",
              },
            ]}
            label="Nombre completo"
            labelCol={{ span: 24 }}
          >
            <Input
              className="w-full border rounded-xl p-2 pl-4"
              placeholder="Nombre completo"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="rating"
            rules={[
              {
                required: true,
                validator: () => {
                  if (rating === 0) {
                    return Promise.reject(
                      "Por favor, ingrese una calificación"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <>
              <div className="flex items-center h-full gap-x-1">
                <span className="text-red-500 text-lg mt-1">*</span>
                <label>Calificación</label>
              </div>
              <Rating
                className="ml-4 mt-3"
                style={{ maxWidth: 150 }}
                value={rating}
                onChange={setRating}
              />
            </>
          </Form.Item>

          {/* Input Message */}
          <Form.Item
            name="testimonial"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese un mensaje",
              },
            ]}
            label="Testimonio"
            labelCol={{ span: 24 }}
          >
            <TextArea
              rows={4}
              placeholder="Ingresa tu mensaje..."
              size="large"
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>

          {/* Checkbox para aceptar políticas de privacidad */}
          <Form.Item
            name="privacyPolice"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Debes aceptar las políticas de privacidad",
              },
            ]}
          >
            <Checkbox
              onChange={(e) => {
                setDisableButton(!e.target.checked);
              }}
            >
              He leído y acepto las{" "}
              <a
                href={Politicas}
                target="_blank"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                políticas de privacidad
              </a>{" "}
              <span className="text-red-500">*</span>
            </Checkbox>
          </Form.Item>

          {/* Botón para enviar mensaje */}
          <Form.Item className="w-full flex justify-center">
            <button
              type="submit"
              className="w-full md:w-72 h-14 bg-[#5aa8c4] text-white font-semibold rounded-md p-4"
              disabled={loading || disableButton}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                "Enviar testimonio"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>

      <div className="lg:w-1/2 max-xl:hidden flex justify-center h-[34rem] relative">
        <div className="bg-gray-200 rounded-lg h-[80%] lg:h-full w-[70%] absolute -z-50"></div>
        <img
          src={contactUsIMG}
          alt="Mike Wazowski"
          className="rounded-tl-[70%] rounded-br-[70%] w-[70%] object-cover"
        />
      </div>
    </div>
  );
}
