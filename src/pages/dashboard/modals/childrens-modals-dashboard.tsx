import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Switch,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";

import { useEffect, useState } from "react";
import {
  FaAddressCard,
  FaArrowRight,
  FaChevronLeft,
  FaSpinner,
} from "react-icons/fa";
import {
  createChildren,
  getChildrenById,
  getChildrensByUserId,
  updateChildren,
} from "../../../services/children-service";

type ChildrenModalProps = {
  type: string; // Tipo específico para 'type', puedes ajustar el tipo según sea necesario
  id: number | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReload: () => void;
};

export default function ChildrenModal({
  type,
  id,
  open,
  setOpen,
  handleReload,
}: ChildrenModalProps) {
  const [loading, setLoading] = useState(false);
  const [paso, setPaso] = useState(1);
  const [isStudent, setIsStudent] = useState(false);
  const [isClubMember, setIsClubMember] = useState(false);
  const [formData, setFormData] = useState<SecondStepType>({});
  const [selectedDocumentType, setSelectedDocumentType] = useState<
    string | undefined
  >(undefined);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [showCustomSchoolInput, setShowCustomSchoolInput] = useState(false);

  // const [form] = Form.useForm();

  const [, setUserData] = useState([]);

  type FirstStepType = {
    name?: string;
    lastName?: string;
    motherLastName?: string;
    documentType?: string;
    documentNumber?: string;
    birthdate?: any;
    emergencyContactPhone?: string;
    gender?: string;
  };
  type SecondStepType = {
    isStudent?: boolean;
    school?: string;
    grade?: string;
    section?: string;
    customSchool?: string;
  };
  type ThirdStepType = {
    isClubMember?: boolean;
    club?: string;
    membershipCardNumber?: string;
    memberName?: string;
    memberLastName?: string;
    memberMotherLastName?: string;
  };
  type FormValues = FirstStepType & SecondStepType & ThirdStepType;

  useEffect(() => {
    setPaso(1);
    if (id) {
      getChildrenByIdForm(id);
    }
  }, [id]);

  const getChildrenByIdForm = async (id: number) => {
    try {
      setLoading(true);
      const children = await getChildrenById(id);

      setIsStudent(children.isStudent || false);
      setIsClubMember(children.isClubMember || false);

      if (children.school === "Otro") {
        setShowCustomSchoolInput(true);
      }

      form1.setFieldsValue({
        name: children.name,
        lastName: children.lastName,
        motherLastName: children.motherLastName,
        documentType: children.documentType,
        documentNumber: children.documentNumber,
        birthdate: moment(children.birthdate),
        emergencyContactPhone: children.emergencyContactPhone,
        gender: children.gender,
      });
      form2.setFieldsValue({
        isStudent: children.isStudent || false,
        school: children.school,
        grade: children.grade,
        section: children.section,
      });
      form3.setFieldsValue({
        isClubMember: children.isClubMember || false,
        club: children.club,
        membershipCardNumber: children.membershipCardNumber,
        memberName: children.memberName,
        memberLastName: children.memberLastName,
        memberMotherLastName: children.memberMotherLastName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateChildrenForm = async (values: FormValues) => {
    try {
      setLoading(true);
      if (values.school === "Otro") {
        values.school = values.customSchool;
      }
      await updateChildren(values, id);
      setOpen(false);
      setShowCustomSchoolInput(false);
      setIsStudent(false);
      setIsClubMember(false);
      setPaso(1);
      handleReload();
    } catch (error) {
      console.error("Error al actualizar un hijo:", error);
    } finally {
      setLoading(false);
    }
  };

  const createChildrenForm = async (values: FormValues) => {
    try {
      setLoading(true);
      if (values.school === "Otro") {
        values.school = values.customSchool;
      }
      await createChildren(values);
      setOpen(false);
      // form.resetFields();
      form1.resetFields();
      form2.resetFields();
      form3.resetFields();
      setShowCustomSchoolInput(false);
      setIsStudent(false);
      setIsClubMember(false);
      setPaso(1);
      handleReload();
    } catch (error) {
      console.error("Error al crear un hijo:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Funcionalidad de crear
  const onFinishStep1 = (values: FirstStepType) => {
    if (values.birthdate) {
      values.birthdate = values.birthdate?.format("YYYY-MM-DD");
    }
    setFormData({
      ...formData,
      ...values,
    });
    setPaso(paso + 1);
  };

  const onFinishStep2 = (values: SecondStepType) => {
    setFormData({
      ...formData,
      ...values,
    });
    setPaso(paso + 1);
  };

  const onFinishStep3 = async (values: ThirdStepType) => {
    const finalFormData = {
      ...formData,
      ...values,
    };
    try {
      if (!finalFormData.isStudent) {
        finalFormData.isStudent = false;
        finalFormData.school = "-";
        finalFormData.grade = "-";
        finalFormData.section = "-";
      }

      if (!finalFormData.isClubMember) {
        finalFormData.isClubMember = false;
        finalFormData.club = "-";
        finalFormData.membershipCardNumber = "-";
        finalFormData.memberName = "-";
        finalFormData.memberLastName = "-";
        finalFormData.memberMotherLastName = "-";
      }

      setLoading(true);
      chooseMethod(type)(finalFormData);
      getChildrensByUserId().then((data) => {
        setUserData(data);
      });
      setOpen(false);
    } catch (error) {
      console.error("Error al crear un hijo", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case "create":
        return "Crear Hijo";
      case "edit":
        return "Editar Hijo";
      case "see":
        return "Ver Hijo";
      default:
        return "Hijo";
    }
  };

  const chooseMethod = (type: string) => {
    switch (type) {
      case "create":
        return createChildrenForm;
      case "edit":
        return updateChildrenForm;
      default:
        return createChildrenForm;
    }
  };

  const disabledDate = (current: any): boolean => {
    return (
      current !== undefined &&
      current.isAfter(dayjs().subtract(2, "years"), "day")
    );
  };

  const handleSwitchChangeIsStudent = (checked: boolean) => {
    setIsStudent(checked);
    form2.setFieldsValue({ isStudent: checked ? 1 : 0 });
    if (!checked) {
      form2.resetFields();
      setShowCustomSchoolInput(false);
    }
  };

  const handleSwitchChangeIsClubMember = (checked: boolean) => {
    setIsClubMember(checked);
    form3.setFieldsValue({ isClubMember: checked ? 1 : 0 });
    if (!checked) {
      form3.resetFields();
    }
  };
  const defaultPickerValue = dayjs().subtract(2, "years");

  return (
    <Modal
      title={getTitle(type)}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      {/* Formulario 1 */}
      <Form
        name="firstStep"
        onFinish={(values) => {
          // chooseMethod(type)(values);
          onFinishStep1(values);
        }}
        onFinishFailed={() => {}}
        autoComplete="off"
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form1}
      >
        <div
          // className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${
          className={`flex flex-col  gap-y-2 mb-8 ${
            paso === 1 ? "block" : "hidden"
          }`}
        >
          {/* ------------------Input Nombre Hijo------------------ */}
          <Form.Item<FirstStepType>
            name="name"
            label="Nombre"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Por favor, ingresa nombre del hijo.",
              },
              {
                max: 50,
                message: "El nombre del hijo es muy largo.",
              },
            ]}
            className="col-span-2 cursor-text"
          >
            <Input
              className="w-full rounded-xl p-4"
              placeholder="Ingresa nombre del hijo"
              size="large"
            />
          </Form.Item>

          <div className="flex gap-x-4 max-sm:flex-col">
            {/* ------------------Input Apellido Paterno Hijos------------------ */}
            <Form.Item<FirstStepType>
              name="lastName"
              label="Apellido Paterno"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa apellido paterno del hijo.",
                },
                {
                  max: 50,
                  message: "El apellido paterno del hijo es muy largo.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa apellido paterno del hijo"
                size="large"
              />
            </Form.Item>

            {/* ------------------Input Apellido Materno Hijo------------------ */}
            <Form.Item<FirstStepType>
              name="motherLastName"
              label="Apellido Materno"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el apellido materno del hijo.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa apellido materno del hijo"
                size="large"
              />
            </Form.Item>
          </div>

          <div className="flex gap-x-4 max-sm:flex-col">
            {/* ------------------Input Tipo de Documento Hijo------------------ */}
            <Form.Item<FirstStepType>
              name="documentType"
              label="Tipo de Documento"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese tipo de documento del hijo",
                },
              ]}
              className="w-full cursor-text"
            >
              <Select
                placeholder="Tipo de Documento del Hijo"
                className="w-full !h-16"
                // style={{ width: 120 }}
                size="large"
                options={[
                  { value: "DNI", label: "DNI" },
                  {
                    value: "PASSPORT",
                    label: "Pasaporte",
                  },
                  {
                    value: "CARNET DE EXTRANJERIA",
                    label: "Carnet de Extranjería",
                  },
                ]}
                onChange={(value) => {
                  setSelectedDocumentType(value);
                  form1.setFieldsValue({
                    documentNumber: undefined,
                  });
                }}
              />
            </Form.Item>

            {/* ------------------Input Número de Documento del Hijo------------------ */}
            <Form.Item<FirstStepType>
              name="documentNumber"
              label="Número de Documento"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese número de documento del hijo",
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("");
                    } else if (
                      selectedDocumentType === "DNI" &&
                      !/^\d{8}$/.test(value)
                    ) {
                      return Promise.reject("El DNI debe tener 8 dígitos");
                    } else if (
                      selectedDocumentType === "PASSPORT" &&
                      !/^[A-Za-z0-9]{6,10}$/.test(value)
                    ) {
                      return Promise.reject(
                        "El pasaporte debe tener entre 6 y 10 caracteres alfanuméricos"
                      );
                    } else if (
                      selectedDocumentType === "CARNET DE EXTRANJERIA" &&
                      !/^\d{9}$/.test(value)
                    ) {
                      return Promise.reject(
                        "El carné de extranjería debe tener 9 dígitos"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full border rounded-xl py-5 px-4"
                placeholder="Número de Documento del Hijo"
                size="large"
                prefix={<FaAddressCard className="site-form-item-icon me-1" />}
                disabled={selectedDocumentType === undefined}
                maxLength={
                  selectedDocumentType === "DNI"
                    ? 8
                    : selectedDocumentType === "PASSPORT"
                    ? 10
                    : selectedDocumentType === "CARNET DE EXTRANJERIA"
                    ? 9
                    : undefined
                }
              />
            </Form.Item>
          </div>

          <div className="flex gap-x-4 max-sm:flex-col">
            {/* ------------------Input Fecha de Nacimiento del Hijo------------------ */}
            <Form.Item<FirstStepType>
              name="birthdate"
              label="Fecha de Nacimiento"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese fecha de nacimiento del hijo",
                },
              ]}
              className="w-full cursor-text"
            >
              <DatePicker
                className="w-full border rounded-xl p-4"
                placeholder="Fecha de Nacimiento"
                size="large"
                allowClear={false}
                disabledDate={disabledDate}
                defaultPickerValue={defaultPickerValue}
              />
            </Form.Item>

            {/* ------------------Input Número de Emergencia------------------ */}
            <Form.Item<FirstStepType>
              name="emergencyContactPhone"
              label="Número de Emergencia"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su número de emergencia",
                },
              ]}
              className="w-full cursor-text"
            >
              <InputNumber
                className="w-full border rounded-xl py-3 px-4"
                placeholder="Número de Emergencia"
                size="large"
                maxLength={9}
              />
            </Form.Item>
          </div>

          {/* ------------------Input Sexo del Hijo------------------ */}
          <Form.Item<FirstStepType>
            name="gender"
            label="Sexo"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Por favor ingrese el sexo del hijo",
              },
            ]}
            className="w-1/2 max-sm:w-full cursor-text"
          >
            <Select
              placeholder="Sexo del Hijo"
              className="w-full !h-16"
              // style={{ width: 120 }}
              size="large"
              options={[
                {
                  value: "Masculino",
                  label: "Masculino",
                },
                {
                  value: "Femenino",
                  label: "Femenino",
                },
              ]}
            />
          </Form.Item>
        </div>
        {/* ------------------Botón de Siguiente------------------ */}
        {paso === 1 && (
          <div className="w-full flex justify-end max-sm:justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl flex justify-center items-center max-sm:w-full sm:px-24 py-4"
              // bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl max-sm:w-full sm:px-24 py-4
            >
              Siguiente
              <FaArrowRight className="ms-1" />
            </button>
          </div>
        )}
      </Form>

      {/* Formulario 2 */}
      <Form
        name="secondStep"
        onFinish={(values) => {
          onFinishStep2(values);
        }}
        autoComplete="off"
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form2}
      >
        <div
          // className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${
          className={`flex flex-col  gap-y-2 mb-8 ${
            paso === 2 ? "block" : "hidden"
          }`}
        >
          {/* ------------------Switch ¿Es estudiante?------------------ */}
          <Form.Item<SecondStepType> name="isStudent">
            <div>
              <span className="me-2">¿Es estudiante?</span>
              <Switch
                className="bg-neutral-400"
                checked={isStudent}
                onChange={handleSwitchChangeIsStudent}
              />
            </div>
          </Form.Item>

          {/* ------------------Input Nombre de la Escuela del Hijo------------------ */}
          <Form.Item<SecondStepType>
            name="school"
            label="Nombre de la Escuela"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: isStudent,
                message: isStudent
                  ? "Por favor, ingresa nombre de la escuela del hijo."
                  : undefined,
              },
              {
                max: 50,
                message: "El nombre de la escuela es muy largo.",
              },
            ]}
            className="col-span-2 cursor-text"
          >
            <Select
              placeholder="Nombre de la Escuela"
              className="w-full !h-16"
              disabled={!isStudent}
              onChange={(value) => {
                if (value === "Otro") {
                  setShowCustomSchoolInput(true);
                } else {
                  setShowCustomSchoolInput(false);
                  form2.setFieldsValue({ school: value });
                }
              }}
            >
              <Select.Option value="Colegio Villa Caritas">
                Colegio Villa Caritas
              </Select.Option>
              <Select.Option value="Colegio San Pedro">
                Colegio San Pedro
              </Select.Option>
              <Select.Option value="Otro">Otro</Select.Option>
            </Select>
          </Form.Item>

          {showCustomSchoolInput && (
            <Form.Item<SecondStepType>
              name="customSchool"
              label="Nombre de la Escuela Personalizado"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message:
                    "Por favor, ingrese el nombre de la escuela personalizado.",
                },
                {
                  max: 50,
                  message:
                    "El nombre de la escuela personalizado es muy largo.",
                },
              ]}
              className="col-span-2 cursor-text"
            >
              <Input
                placeholder="Nombre de la Escuela Personalizado"
                size="large"
              />
            </Form.Item>
          )}

          <div className="flex gap-x-4 max-sm:flex-col">
            {/* ------------------Input Grado del Hijo------------------ */}
            <Form.Item<SecondStepType>
              name="grade"
              label="Grado"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: isStudent,
                  message: "Por favor, ingresa el grado del hijo.",
                },
                {
                  max: 50,
                  message: "El grado es muy largo.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa el grado del hijo"
                size="large"
                disabled={!isStudent}
              />
            </Form.Item>

            {/* ------------------Input Sección del Hijo------------------ */}
            <Form.Item<SecondStepType>
              name="section"
              label="Sección"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: isStudent,
                  message: "Por favor, ingresa la sección del hijo.",
                },
                {
                  max: 50,
                  message: "La sección es muy larga.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa la sección del hijo"
                size="large"
                disabled={!isStudent}
              />
            </Form.Item>
          </div>
        </div>
        {/* ------------------Botón de Siguiente------------------ */}
        {paso === 2 && (
          <div className="flex justify-between max-sm:flex-col-reverse max-sm:gap-8">
            <button
              type="button"
              onClick={() => setPaso(paso - 1)}
              className="flex justify-center items-center gap-x-1 font-semibold rounded-xl bg-indigo-300 max-sm:w-full sm:px-14 py-4 duration-300 hover:bg-gray-200 hover:duration-300 hover:animate-pulse"
              // bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl flex justify-center items-center max-sm:w-full sm:px-24 py-4
            >
              <FaChevronLeft className="text-lg" />
              Regresar
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl flex justify-center items-center max-sm:w-full sm:px-24 py-4"
              // bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl flex justify-center items-center max-sm:w-full sm:px-24 py-4
            >
              Siguiente
              <FaArrowRight className="ms-1" />
            </button>
          </div>
        )}
      </Form>

      {/* Formulario 3 */}
      <Form
        name="thirdStep"
        onFinish={(values) => {
          onFinishStep3(values);
        }}
        autoComplete="off"
        className="my-10 max-sm:mx-0 md:mx-10 lg:mx-32"
        form={form3}
      >
        <div
          // className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${
          className={`flex flex-col  gap-y-2 mb-8 ${
            paso === 3 ? "block" : "hidden"
          }`}
        >
          <div className="flex gap-x-4 max-sm:flex-col">
            {/* ------------------Switch ¿Es miembro de un club?------------------ */}
            <Form.Item<ThirdStepType> name="isClubMember" className="w-full">
              <div>
                <span className="me-2">¿Es miembro de un club?</span>
                <Switch
                  className="bg-neutral-400"
                  checked={isClubMember}
                  onChange={handleSwitchChangeIsClubMember}
                />
              </div>
            </Form.Item>

            {/* ------------------Input Nombre del Club del Miembro------------------ */}
            <Form.Item<ThirdStepType>
              name="club"
              label="Nombre del Club"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: isClubMember,
                  message: "Por favor, ingresa nombre del club.",
                },
                {
                  max: 50,
                  message: "El nombre del club es muy largo.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa nombre del club"
                size="large"
                disabled={!isClubMember}
              />
            </Form.Item>
          </div>

          <div className="flex gap-x-4 max-sm:flex-col">
            {/* ------------------Input Número de Carnét de Miembro------------------ */}
            <Form.Item<ThirdStepType>
              name="membershipCardNumber"
              label="Número del Carnét del Miembro"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: isClubMember,
                  message: "Por favor ingrese número del carnét del miembro",
                },
              ]}
              className="w-full cursor-text"
            >
              <InputNumber
                className="w-full border rounded-xl py-3 px-4"
                placeholder="Número del carnét del miembro"
                size="large"
                maxLength={9}
                disabled={!isClubMember}
              />
            </Form.Item>

            {/* ------------------Input Nombre del Miembro------------------ */}
            <Form.Item<ThirdStepType>
              name="memberName"
              label="Nombre del Miembro"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: isClubMember,
                  message: "Por favor, ingresa nombre del miembro del club.",
                },
                {
                  max: 50,
                  message: "El nombre del miebro del club es muy largo.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa nombre del miembro del club"
                size="large"
                disabled={!isClubMember}
              />
            </Form.Item>
          </div>

          <div className="flex gap-x-4 max-sm:flex-col">
            {/* ------------------Input Apellido Paterno del Miembro------------------ */}
            <Form.Item<ThirdStepType>
              name="memberLastName"
              label="Apellido Paterno del Miembro"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: isClubMember,
                  message:
                    "Por favor, ingresa apellido paterno del miembro del club.",
                },
                {
                  max: 50,
                  message:
                    "El apellido paterno del miembro del club es muy largo.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa apellido paterno del miembro del club"
                size="large"
                disabled={!isClubMember}
              />
            </Form.Item>

            {/* ------------------Input Apellido Materno del Miembro------------------ */}
            <Form.Item<ThirdStepType>
              name="memberMotherLastName"
              label="Apellido Materno del Miembro"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: isClubMember,
                  message:
                    "Por favor, ingresa apellido materno del miembro del club.",
                },
                {
                  max: 50,
                  message:
                    "El apellido materno del miembro del club es muy largo.",
                },
              ]}
              className="w-full cursor-text"
            >
              <Input
                className="w-full rounded-xl p-4"
                placeholder="Ingresa apellido materno del miembro del club"
                size="large"
                disabled={!isClubMember}
              />
            </Form.Item>
          </div>
        </div>

        {paso === 3 && (
          <div className="flex justify-between max-sm:flex-col-reverse max-sm:gap-8">
            <button
              type="button"
              onClick={() => setPaso(paso - 1)}
              className="flex justify-center items-center gap-x-1 font-semibold rounded-xl bg-indigo-300 max-sm:w-full sm:px-14 py-4 duration-300 hover:bg-gray-200 hover:duration-300 hover:animate-pulse"
            >
              <FaChevronLeft className="text-lg" />
              Regresar
            </button>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-xl flex justify-center items-center max-sm:w-full sm:px-24 py-4 "
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={<FaSpinner className="text-white text-2xl" />}
                />
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        )}
      </Form>
    </Modal>
  );
}
