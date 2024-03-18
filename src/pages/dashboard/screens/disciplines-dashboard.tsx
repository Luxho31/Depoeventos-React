import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../../../context/AuthProvider";
import { deleteDiscipline, getAllDisciplines } from "../../../services/disciplines-service";
import DisciplineModal from "../modals/disciplines-modals-dashboard";

type DisciplineData = {
	id: number;
	name: string;
	description: string;
};

export default function DiciplinesDashboard() {
	const [disciplineData, setDisciplineData] = useState<DisciplineData[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [editId, setEditId] = useState<number | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const { userRole } = useAuth();
	const usersPerPage: number = 5;

	useEffect(() => {
		const specificRole: string = "ADMIN";
		if (userRole && userRole.some((role) => role === specificRole)) {
			setLoading(true);
			getAllDisciplines()
				.then((data: DisciplineData[]) => {
					setDisciplineData(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error al obtener disciplinas:", error);
					setLoading(false);
				});
		}
	}, [userRole]);

	const handleReload = () => {
		try {
			setLoading(true);
			getAllDisciplines().then((data) => {
				setDisciplineData(data);
			});
		} catch (error) {
			console.error("Error al recargar usuarios:", error);
		} finally {
			setLoading(false);
		}
	};

	const openCreateDisciplineModal = () => {
		setOpenCreateModal(true);
	};

	const openEditDisciplineModal = (id: number) => {
		setEditId(id);
		setOpenEditModal(true);
	};

	const handleRemoveDiscipline = async (id: number) => {
		try {
			setLoading(true);
			await deleteDiscipline(id);
			handleReload();
		} catch (error) {
			console.error("Error al eliminar disciplina:", error);
		} finally {
			setLoading(false);
		}

	}
	const handleSearch = () => {
		// Actualiza la página actual a 1 después de la búsqueda
		setCurrentPage(1);
	};

	const onPageChange = (page: number) => {
		// Mantén la búsqueda al cambiar de página
		const filteredUsers = disciplineData.filter((discipline) =>
			discipline.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		const indexOfLastUser: number = page * usersPerPage;
		const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
		const currentUsers: DisciplineData[] = filteredUsers.slice(
			indexOfFirstUser,
			indexOfLastUser
		);

		setCurrentPage(page);
	};

	const indexOfLastUser: number = currentPage * usersPerPage;
	const indexOfFirstUser: number = indexOfLastUser - usersPerPage;

	const filteredUsers = disciplineData.filter((discipline) =>
		discipline.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const currentUsers: DisciplineData[] = filteredUsers.slice(
		indexOfFirstUser,
		indexOfLastUser
	);

	return (
		<div className="h-screen">
			<div className="flex justify-between items-center mb-5">
				<Button onClick={openCreateDisciplineModal}>
					+ Crear Disciplinas
				</Button>
				<DisciplineModal
					create={true}
					open={openCreateModal}
					setOpen={setOpenCreateModal}
					handleReload={handleReload}
				/>
				<DisciplineModal
					create={false}
					id={editId}
					open={openEditModal}
					setOpen={setOpenEditModal}
					handleReload={handleReload}
				/>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
					<label htmlFor="table-search" className="sr-only">
						Search
					</label>
					<div className="relative">
						<Input
							id="table-search-users"
							placeholder="Buscar por nombre"
							className="w-full rounded-xl p-1"
							size="small"
							prefix={<CiSearch className="site-form-item-icon me-1" />}
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								handleSearch();
							}}
						/>
					</div>
				</div>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								ID
							</th>
							<th scope="col" className="px-6 py-3">
								Nombre
							</th>
							<th scope="col" className="px-6 py-3">
								Descripción
							</th>
							<th scope="col" className="px-6 py-3">
								Operaciones
							</th>
						</tr>
					</thead>
					<tbody>
						{currentUsers.map((user, index) => (
							<tr key={index} className="bg-white border-b hover:bg-gray-50">
								<td className="px-6 py-4">{user.id}</td>
								<td className="px-6 py-4">{user.name}</td>
								<td className="px-6 py-4">{user.description}</td>
								<td className="flex px-6 py-4 gap-x-2">
									<button
										className="bg-slate-300 rounded-md p-1"
										onClick={() => openEditDisciplineModal(user.id)}
									>
										<FaEdit className="text-xl text-gray-700" />
									</button>
									<Popconfirm
										title="Eliminar disciplina?"
										description="Esta acción no se puede deshacer."
										onConfirm={() => handleRemoveDiscipline(user.id)}
										okText="Si"
										cancelText="No"
										okButtonProps={{
											className: "bg-red-500 text-white !hover:bg-red-600",
										}}
										icon={<QuestionCircleOutlined style={{ color: 'red' }}
										/>}
									>
										<button
											className="bg-red-300 rounded-md p-1"
										>
											<FaRegTrashAlt className="text-xl text-gray-700" />
										</button>
									</Popconfirm>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					className="mt-4"
					current={currentPage}
					total={filteredUsers.length}
					pageSize={usersPerPage}
					onChange={onPageChange}
					showSizeChanger={false}
				/>
			</div>
		</div>
	);
}
