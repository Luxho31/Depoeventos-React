import { Input, Pagination, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser, FaUserEdit, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllUsers, updateRole } from "../../../services/user-service";
import { toast, Toaster } from "sonner";

type UserData = {
  id: number;
  username: string;
  country: string;
  firstName: string;
  lastName: string;
  motherLastName: string;
  documentType: string;
  documentNumber: string;
  contactNumber: string;
  emergencyContactNumber: string;
  address: string;
  birthDate: string;
  photo: string;
  roles: [];
};

function UsersDashboard() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalElements, setTotalElements] = useState<number>(0);
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const specificRole: string = "ADMIN";

  useEffect(() => {
    if (userRole && userRole.some((role) => role === specificRole)) {
      handleReload(0);
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  useEffect(() => {
    const timeoutId = setTimeout(() => handleReload(currentPage), 400);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, currentPage]);

  const handleReload = (page: number) => {
    setLoading(true);
    getAllUsers(page, searchTerm)
      .then((data: any) => {
        setUserData(data.content);
        setCurrentPage(page);
        setTotalElements(data.totalElements);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error reloading users:", error);
        setLoading(false);
      });
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleRoleClick = async (userId: any, role: any) => {
    const superAdmins = [1, 2, 3];
    if (superAdmins.includes(userId)) {
      toast.error("No puedes cambiar el rol de un super administrador");
      return;
    }
    try {
      await updateRole(userId, role);
      toast.message("Rol cambiado correctamente", {
        description: `El rol de ${role} ha sido cambiado correctamente`,
      });
      handleReload(currentPage);
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
      toast.error("Error al cambiar el rol del usuario");
    }
  };

  const rolesWithIcons: any = {
    ADMIN: <FaUserEdit size={14} />,
    USER: <FaUser size={14} />,
    TEACHER: <FaUserGraduate size={14} />,
  };
  return (
    <div className="h-screen">
      <Toaster richColors />
      <div className="flex justify-between">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <div className="relative">
            <Input
              id="table-search-users"
              placeholder="Buscar por nombre, número de documento..."
              className="w-full rounded-xl p-1"
              size="small"
              prefix={<CiSearch className="site-form-item-icon me-1 ml-2" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de Nacimiento
              </th>
              <th scope="col" className="px-6 py-3">
                Número de Contacto
              </th>
              <th scope="col" className="px-6 py-3">
                País
              </th>
              <th scope="col" className="px-6 py-3">
                Documento
              </th>
              <th scope="col" className="px-6 py-3">
                Roles
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    className="w-10 h-10 rounded-full border border-black"
                    src={
                      // user.photo ||
                      "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                    }
                    alt={`${user.firstName} image`}
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {user.username}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.birthDate}</td>
                <td className="px-6 py-4">{user.contactNumber}</td>
                <td className="px-6 py-4">{user.country}</td>
                <td className="px-6 py-4">
                  <div className="text-base font-semibold">
                    {user.documentNumber}
                  </div>
                  <div className="font-normal text-gray-500">
                    {user.documentType}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {Object.keys(rolesWithIcons).map((role) => (
                      <Tooltip title={role} key={role} color={"cyan"}>
                        <span
                          key={role}
                          className={
                            user.roles.includes(role as never)
                              ? "text-orange-600 cursor-not-allowed"
                              : "text-gray-400 cursor-pointer"
                          }
                          onClick={() => handleRoleClick(user.id, role)}
                        >
                          {rolesWithIcons[role]}
                        </span>
                      </Tooltip>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className="mt-4"
        current={currentPage + 1}
        total={totalElements}
        pageSize={10}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default UsersDashboard;
