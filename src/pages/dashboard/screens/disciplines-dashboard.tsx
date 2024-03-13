import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  GetProp,
  Input,
  Modal,
  Spin,
  Upload,
  UploadProps,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import CustomTable from "../../../components/tables/custom-table";
import {
  createDiscipline,
  getAllDisciplines,
} from "../../../services/disciplines-service";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function DiciplinesDashboard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllDisciplines().then((data) => {
      setUserData(data);
    });
  }, []);

  const handleReload = () => {
    try {
      setLoading(true);
      getAllDisciplines().then((data) => {
        setUserData(data);
      });
    } catch (error) {
      console.error("Error al recargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: "5%", editable: true },
    { title: "Nombre", dataIndex: "name", width: "20%", editable: true },
    {
      title: "Descripción",
      dataIndex: "description",
      width: "60%",
      editable: true,
    },
  ];

  const [open, setOpen] = useState(false);

  const { TextArea } = Input;

  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const createDisciplineForm = async (form: any) => {
    try {
      createDiscipline(form);
      getAllDisciplines().then((data) => {
        setUserData(data);
      });
    } catch (error) {
      console.error("Error al crear un hijo:", error);
      throw error;
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center">
        <button
          onClick={handleReload}
          className="pb-8 border mb-5 shadow-md flex h-2 px-4 py-2 bg-white rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          {loading ? "hola" : <IoReload className="text-lg" />}
        </button>

        {/* ------------------- VENTANA MODAL ----------------- */}
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          className="bg-blue-500"
        >
          + Crear Disciplinas
        </Button>
        <Modal
          title="Crear Disciplina"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          footer={null} // Eliminamos el footer
        >
          <Form
            name="login"
            onFinish={(values) => {
              createDisciplineForm(values);
            }}
            onFinishFailed={() => {
              console.log("Fallo");
            }}
            className="my-10 max-md:mx-20 md:mx-32"
          >
            <div className="flex flex-col gap-y-4">
              {/* ------------------Input Nombre Disciplina------------------ */}
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa nombre de la disciplina.",
                  },
                  {
                    max: 50,
                    message: "El nombre de la disciplina es muy largo.",
                  },
                ]}
                className="cursor-text"
              >
                <Input
                  className="w-full rounded-xl p-4"
                  placeholder="Ingresa nombre de la disciplina"
                  size="large"
                />
              </Form.Item>

              {/* ------------------Input Descripcion Disciplina------------------ */}
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese descripción de la disciplina.",
                  },
                ]}
                className="cursor-text"
              >
                <TextArea
                  rows={4}
                  placeholder="maxLength is 6"
                  maxLength={6}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                />
              </Form.Item>

              {/* ------------------Fotografia de la Disciplina------------------ */}
              <Form.Item
                name="photo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese fotografia de la disciplina.",
                  },
                ]}
                className="cursor-text"
              >
                {/* <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload> */}
                <Input
                  className="w-full rounded-xl p-4"
                  placeholder="Ingresa nombre de la disciplina"
                  size="large"
                ></Input>
              </Form.Item>
            </div>

            <Form.Item className="w-full flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold rounded-xl px-12 !h-12 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  "Crear"
                )}
              </button>
            </Form.Item>
          </Form>
        </Modal>
        {/* ------------------- VENTANA MODAL ----------------- */}
      </div>

      <CustomTable columns={columns} dataTable={userData} expandable={false} />
    </div>
  );
}
