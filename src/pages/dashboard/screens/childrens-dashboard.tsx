import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { useState } from "react";
import { FaAddressCard, FaArrowRight } from "react-icons/fa";
import CustomTable from "../../../components/tables/custom-table";

export default function ChildrensDashboard() {
	const [loading, setLoading] = useState(false);
	const [paso, setPaso] = useState(1);
	const [formData, setFormData] = useState<RegisterType>({});
	const [selectedDocumentType, setSelectedDocumentType] = useState<
		string | undefined
	>(undefined);
	const [form] = useForm();
	// ---------------- Modal
	const [open, setOpen] = useState(false);

	const [isStudent, setIsStudent] = useState(false);
	const [isClubMember, setIsClubMember] = useState(false);

	type RegisterType = {
		firstName?: String;
		lastName?: String;
		motherLastName?: String;
		documentType?: String;
		documentNumber?: String;
		birthDate?: String;
		emergencyContactNumber?: String;
		sex?: String;

		isStudent?: Boolean;
		school?: String;
		grade?: String;
		section?: String;

		isClubMember?: Boolean;
		nameClub?: String;
		membershipCardNumber?: String;
		memberName?: String;
		memberLastName?: String;
		memberMotherLastName?: String;
	};

	const data = [
		{
			key: 1,
			name: "John Brown",
			age: 32,
			address: "New York No. 1 Lake Park",
			description:
				"My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
		},
		{
			key: 2,
			name: "John Brown",
			age: 32,
			address: "New York No. 1 Lake Park",
			description:
				"My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
		},
	];
	const columns = [
		{ title: "nombre", dataIndex: "name", width: "20%", editable: true },
		{ title: "edad", dataIndex: "age", width: "20%", editable: true },
		{ title: "address", dataIndex: "address", width: "30%", editable: true },
	];

	const disabledDate = (current: any) => {
		return current && current > moment().subtract(18, "years");
	};

	// ---------------- Switch
	const switchIsStudent = (checked: boolean) => {
		console.log(`switch to ${checked}`);
		// setIsStudent(checked);
	};

	const switchIsClubMember = (checked: boolean) => {
		console.log(`switch to ${checked}`);
		// setIsClubMember(checked);
	};

	// ---------------- Funcionalidad de crear
	const onFinishStep1 = (values: any) => {
		setFormData({
			...formData,
			...values,
		});
		setPaso(paso + 1);
		console.log(setFormData);
	};

	const onFinishStep2 = (values: any) => {
		setFormData({
			...formData,
			...values,
		});
		setPaso(paso + 1);
	};

	const onFinishStep3 = (values: any) => {
		setFormData({
			...formData,
			...values,
		});
		setPaso(paso + 1);
	};

	const onFinishStep4 = async (values: any) => {
		try {
			setLoading(true);
			const finalFormData = {
				...formData,
				...values,
				birthDate: values.birthDate.format("YYYY-MM-DD"),
			};
			console.log(finalFormData);

			// const response = await register(finalFormData);
			// console.log("Respuesta del registro:", response);

			// navigate("/");
		} catch (error: any) {
			// toast.error(error.message);
			if (error.message === "El correo electrónico ya está en uso") {
				form.setFields([
					{
						name: "username",
						errors: ["El correo electrónico ya está en uso"],
					},
				]);
			} else if (error.message === "El número de documento ya está en uso") {
				form.setFields([
					{
						name: "documentNumber",
						errors: ["El número de documento ya está en uso"],
					},
				]);
			} else {
				// toast.error("Error al registrar el usuario");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-screen">

			<div className="flex justify-between items-center">
				{/* ------------------- VENTANA MODAL ----------------- */}
				<Button
					type="primary"
					onClick={() => setOpen(true)}
					className="bg-blue-500"
				>
					+ Crear Hijo
				</Button>
				<Modal
					title="Crear Usuario"
					centered
					open={open}
					onOk={() => setOpen(false)}
					onCancel={() => setOpen(false)}
					width={1000}
					footer={null} // Eliminamos el footer
				>
					{/* Formulario 1 */}
					<Form
						name="firstStep"
						onFinish={(values) => {
							onFinishStep1(values);
						}}
						autoComplete="off"
						className="my-10 max-md:mx-20 md:mx-32"
						form={form}
					>
						<div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${paso === 1 ? "block" : "hidden"}`}>
							{/* ------------------Input Nombre Hijo------------------ */}
							<Form.Item<RegisterType>
								name="firstName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa nombre del hijo.",
									},
									{ max: 50, message: "El nombre del hijo es muy largo." },
								]}
								className="col-span-2 cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa nombre del hijo"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Apellido Paterno Hijos------------------ */}
							<Form.Item<RegisterType>
								name="lastName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa apellido paterno del hijo.",
									},
									{ max: 50, message: "El apellido paterno del hijo es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa apellido paterno del hijo"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Apellido Materno Hijo------------------ */}
							<Form.Item<RegisterType>
								name="motherLastName"
								rules={[
									{
										required: true,
										message: "Por favor ingrese el apellido materno del hijo.",
									},
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa apellido materno del hijo"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Tipo de Documento Hijo------------------ */}
							<Form.Item<RegisterType>
								name="documentType"
								rules={[
									{
										required: true,
										message: "Por favor ingrese tipo de documento del hijo",
									},
								]}
							>
								<Select
									placeholder="Tipo de Documento del Hijo"
									className="w-full !h-16"
									// style={{ width: 120 }}
									size="large"
									options={[
										{ value: "DNI", label: "DNI" },
										{ value: "PASSPORT", label: "Pasaporte" },
										{
											value: "CARNET DE EXTRANJERIA",
											label: "Carnet de Extranjería",
										},
									]}
									onChange={(value) => {
										setSelectedDocumentType(value);
										form.setFieldsValue({
											documentNumber: undefined,
										});
									}}
								/>
							</Form.Item>

							{/* ------------------Input Número de Documento del Hijo------------------ */}
							<Form.Item<RegisterType>
								name="documentNumber"
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
								className="cursor-text"
							>
								<Input
									className="w-full border rounded-xl py-5 px-4"
									placeholder="Número de Documento del Hijo"
									size="large"
									prefix={
										<FaAddressCard className="site-form-item-icon me-1" />
									}
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

							{/* ------------------Input Fecha de Nacimiento del Hijo------------------ */}
							<Form.Item<RegisterType>
								name="birthDate"
								rules={[
									{
										required: true,
										message: "Por favor ingrese fecha de nacimiento del hijo",
									},
								]}
								className="cursor-text"
							>
								<DatePicker
									className="w-full border rounded-xl p-4"
									placeholder="Fecha de Nacimiento"
									size="large"
									allowClear={false}
									disabledDate={disabledDate}
								/>
							</Form.Item>

							{/* ------------------Input Número de Emergencia------------------ */}
							<Form.Item<RegisterType>
								name="emergencyContactNumber"
								rules={[
									{
										required: true,
										message: "Por favor ingrese su número de emergencia",
									},
								]}
								className="cursor-text"
							>
								<InputNumber
									className="w-full border rounded-xl py-3 px-4"
									placeholder="Número de Emergencia"
									size="large"
									maxLength={9}
								/>
							</Form.Item>

							{/* ------------------Input Sexo del Hijo------------------ */}
							<Form.Item<RegisterType>
								name="sex"
								rules={[
									{
										required: true,
										message: "Por favor ingrese el sexo del hijo",
									},
								]}
							>
								<Select
									placeholder="Sexo del Hijo"
									className="w-full !h-16"
									// style={{ width: 120 }}
									size="large"
									options={[
										{ value: "MASCULINO", label: "Masculino" },
										{ value: "FEMENINO", label: "Femenino" },
									]}
								// onChange={(value) => {
								//   setSelectedDocumentType(value);
								//   form.setFieldsValue({
								//     documentNumber: undefined,
								//   });
								// }}
								/>
							</Form.Item>
						</div>
						{/* ------------------Botón de Siguiente------------------ */}
						{paso === 1 && (
							<Form.Item className="w-full flex justify-center">
								<button
									type="submit"
									className="w-96 bg-[#f46e16] text-white font-semibold rounded-xl p-4 flex justify-center items-center"
								// bg-blue-500 hover:bg-blue-600
								>
									Siguiente
									<FaArrowRight className="ms-1" />
								</button>
							</Form.Item>
						)}
					</Form>

					{/* Formulario 2 */}
					<Form
						name="register"
						onFinish={(values) => {
							onFinishStep2(values);
						}}
						autoComplete="off"
						className="my-10 max-md:mx-20 md:mx-32"
						form={form}
					>
						<div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${paso === 2 ? "block" : "hidden"}`}>
							{/* ------------------Switch ¿Es estudiante?------------------ */}
							<Form.Item<RegisterType>
								name="isStudent"
								className="flex justify-center items-center"
							>
								<div>
									<label className="me-8 text-lg text-neutral-400 select-none">¿Es estudiante?</label>
									<Switch
										onChange={switchIsStudent}
										className="bg-neutral-400"
									/>
								</div>
							</Form.Item>

							{/* ------------------Input Nombre de la Escuela del Hijo------------------ */}
							<Form.Item<RegisterType>
								name="school"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa nombre de la escuela del hijo.",
									},
									{ max: 50, message: "El nombre de la escuela es muy largo." },
								]}
								className="col-span-2 cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa nombre de la escuela del hijo"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Grado del Hijo------------------ */}
							<Form.Item<RegisterType>
								name="grade"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa el grado del hijo.",
									},
									{ max: 50, message: "El grado es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa el grado del hijo"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Sección del Hijo------------------ */}
							<Form.Item<RegisterType>
								name="section"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa la sección del hijo.",
									},
									{ max: 50, message: "La sección es muy larga." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa la sección del hijo"
									size="large"
								/>
							</Form.Item>
						</div>
						{/* ------------------Botón de Siguiente------------------ */}
						{paso === 2 && (
							<Form.Item className="w-full flex justify-center">
								<button
									type="submit"
									className="w-96 bg-[#f46e16] text-white font-semibold rounded-xl p-4 flex justify-center items-center"
								// bg-blue-500 hover:bg-blue-600
								>
									Siguiente
									<FaArrowRight className="ms-1" />
								</button>
							</Form.Item>
						)}
					</Form>

					{/* Formulario 3 */}
					<Form
						name="ThreeStep"
						onFinish={(values) => {
							onFinishStep3(values);
						}}
						autoComplete="off"
						className="my-10 max-md:mx-20 md:mx-32"
						form={form}
					>
						<div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${paso === 3 ? "block" : "hidden"}`}>
							{/* ------------------Switch ¿Es miebro de un cub?------------------ */}
							<Form.Item<RegisterType> name="isClubMember">
								<Switch
									onChange={switchIsClubMember}
									className="bg-neutral-400"
								/>
							</Form.Item>

							{/* ------------------Input Nombre del Club del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="nameClub"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa nombre del club.",
									},
									{ max: 50, message: "El nombre del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa nombre del club"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Número de Carnét de Miembro------------------ */}
							<Form.Item<RegisterType>
								name="membershipCardNumber"
								rules={[
									{
										required: true,
										message: "Por favor ingrese número del carnét del miembro",
									},
								]}
								className="cursor-text"
							>
								<InputNumber
									className="w-full border rounded-xl py-3 px-4"
									placeholder="Número del carnét del miembro"
									size="large"
									maxLength={9}
								/>
							</Form.Item>

							{/* ------------------Input Nombre del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="memberName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa nombre del miembro del club.",
									},
									{ max: 50, message: "El nombre del miebro del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa nombre del miembro del club"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Apellido Paterno del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="memberLastName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa apellido paterno del miembro del club.",
									},
									{ max: 50, message: "El apellido paterno del miembro del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa apellido paterno del miembro del club"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Apellido Materno del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="memberMotherLastName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa apellido materno del miembro del club.",
									},
									{ max: 50, message: "El apellido materno del miembro del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa apellido materno del miembro del club"
									size="large"
								/>
							</Form.Item>
						</div>

						{paso === 3 && (
							<Form.Item className="w-full flex justify-center">
								<button
									type="submit"
									className="w-96 bg-[#f46e16] text-white font-semibold rounded-xl p-4 flex justify-center items-center"
								// bg-blue-500 hover:bg-blue-600
								>
									Siguiente
									<FaArrowRight className="ms-1" />
								</button>
							</Form.Item>
						)}
					</Form>

					{/* Formulario 4 */}
					<Form
						name="FourStep"
						onFinish={onFinishStep4}
						autoComplete="off"
						className="my-10 max-md:mx-20 md:mx-32"
					>
						<div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-8 ${paso === 4 ? "block" : "hidden"}`}>
							{/* ------------------Switch ¿Es miebro de un cub?------------------ */}
							<Form.Item<RegisterType> name="isClubMember">
								<Switch
									onChange={switchIsClubMember}
									className="bg-neutral-400"
								/>
							</Form.Item>

							{/* ------------------Input Nombre del Club del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="nameClub"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa nombre del club.",
									},
									{ max: 50, message: "El nombre del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa nombre del club"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Número de Carnét de Miembro------------------ */}
							<Form.Item<RegisterType>
								name="membershipCardNumber"
								rules={[
									{
										required: true,
										message: "Por favor ingrese número del carnét del miembro",
									},
								]}
								className="cursor-text"
							>
								<InputNumber
									className="w-full border rounded-xl py-3 px-4"
									placeholder="Número del carnét del miembro"
									size="large"
									maxLength={9}
								/>
							</Form.Item>

							{/* ------------------Input Nombre del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="memberName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa nombre del miembro del club.",
									},
									{ max: 50, message: "El nombre del miebro del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa nombre del miembro del club"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Apellido Paterno del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="memberLastName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa apellido paterno del miembro del club.",
									},
									{ max: 50, message: "El apellido paterno del miembro del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa apellido paterno del miembro del club"
									size="large"
								/>
							</Form.Item>

							{/* ------------------Input Apellido Materno del Miembro------------------ */}
							<Form.Item<RegisterType>
								name="memberMotherLastName"
								rules={[
									{
										required: true,
										message: "Por favor, ingresa apellido materno del miembro del club.",
									},
									{ max: 50, message: "El apellido materno del miembro del club es muy largo." },
								]}
								className="cursor-text"
							>
								<Input
									className="w-full rounded-xl p-4"
									placeholder="Ingresa apellido materno del miembro del club"
									size="large"
								/>
							</Form.Item>
						</div>

						{paso === 4 && (
							<Form.Item className="w-full flex justify-center">
								<button
									type="submit"
									className="w-96 bg-[#f46e16] text-white font-semibold rounded-xl p-4 flex justify-center items-center"
								// bg-blue-500 hover:bg-blue-600
								>
									Siguiente
									<FaArrowRight className="ms-1" />
								</button>
							</Form.Item>
						)}
					</Form>
				</Modal>
				{/* ------------------- VENTANA MODAL ----------------- */}
			</div>

			<CustomTable columns={columns} dataTable={data} expandable={true} />
		</div>
	);
}
