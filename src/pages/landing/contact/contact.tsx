import { Checkbox, Form, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";

export default function Contact() {

  const { Option } = Select;
  const { TextArea } = Input;


  const handleSignIn = async (values: any) => {
    try {
      console.log(values);
      // await userApi.signIn(values.email, values.password);
    } catch (error) {
      console.log(error);
    }
  };

  type ContactUsType = {
    fullName?: string;
    email?: string;
    password?: string;
    phone?: string;
    message?: string;
    privacyPolice?: boolean;
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="51">+51</Option>
        <Option value="58">+58</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="h-screen flex w-[80%] m-auto ">
      <div className="flex-1 pt-[90px] flex items-center justify-center">
        <Form
          name="contact-us"
          onFinish={handleSignIn}
          onFinishFailed={() => {
            console.log("Fallo");
          }}
          className="w-[750px] max-md:mx-20 md:mx-32"
        >
          <Form.Item<ContactUsType>
            name="fullName"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre completo",
              },
            ]}
            className="cursor-text"
          >
            <Input
              className="w-full border rounded-xl p-4"
              placeholder="Nombre completo"
              size="large"
            //prefix={<FaUser className="site-form-item-icon me-1" />}
            />
          </Form.Item>

          {/* Input Email */}
          <Form.Item<ContactUsType>
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa tu correo electrónico.",
              },
              {
                type: "email",
                message: "Ingresa un correo electrónico válido.",
              },
            ]}
            className="cursor-text"
          >
            <Input
              className="w-full rounded-xl p-4"
              placeholder="Ingresa tu username"
              size="large"
            //prefix={<FaEnvelope className="site-form-item-icon me-1" />}
            />
          </Form.Item>

          {/* Input Phone */}

          <Form.Item<ContactUsType>
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large" placeholder="Ingresa tu numero de celular" />
          </Form.Item>

          {/* Input Message */}
          <Form.Item<ContactUsType>
            name="message"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su mensaje",
              },
            ]}
            className="cursor-text"
          >
            <TextArea rows={4} placeholder="Ingrese su mensaje..." size="large" autoSize={{ minRows: 4, maxRows: 4 }} />
          </Form.Item>

          <Form.Item<ContactUsType> name="privacyPolice">
            <Checkbox >He leido y acepto las politicas de privacidad *</Checkbox>
          </Form.Item>


          {/* Botón para enviar mensaje */}
          <Form.Item className="w-full">
            <button
              type="submit"
              className="w-full bg-[#f46e16] text-white font-semibold rounded-xl p-4"
            >
              Enviar mensaje
            </button>
          </Form.Item>

        </Form>
      </div>
      <div className="flex-1 pt-[90px] flex items-center justify-center">
        <img
          src="https://www.gifcen.com/wp-content/uploads/2023/08/avengers-gif-6.gif"
          alt="Mike Wazowski"
          className="rounded-tl-[500px] rounded-br-[500px] h-[1000px] w-[800px]"
        />

      </div>
    </div>
  );
}
