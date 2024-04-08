import { Input, Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { getAllUsers } from "../../../services/user-service";

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
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
    const { userRole } = useAuth();
    const usersPerPage: number = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const specificRole: string = "ADMIN";
        if (userRole && userRole.some((role) => role === specificRole)) {
            setLoading(true);
            getAllUsers()
                .then((data: UserData[]) => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                    setLoading(false);
                });
        } else {
            navigate("/dashboard");
        }
    }, [userRole]);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, userData]);

    const handleReload = () => {
        setLoading(true);
        getAllUsers()
            .then((data: UserData[]) => {
                setUserData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error reloading users:", error);
                setLoading(false);
            });
    };

    const handleSearch = () => {
        setCurrentPage(1);
        const searchTerms = searchTerm.toLowerCase().split(" ");
        const filteredUsers = userData.filter((user) =>
            searchTerms.some((term) =>
                `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()} ${
                    user.documentNumber
                }`.includes(term)
            )
        );
        setFilteredUsers(filteredUsers);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastUser: number = currentPage * usersPerPage;
    const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
    const currentUsers: UserData[] = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    return (
        <div className="h-screen">
            <div className="flex justify-between">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <Input
                            id="table-search-users"
                            placeholder="Buscar por nombre, número de documento..."
                            className="w-full rounded-xl p-1"
                            size="small"
                            prefix={
                                <CiSearch className="site-form-item-icon me-1 ml-2" />
                            }
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    onClick={handleReload}
                    className="pb-8 mb-5 flex h-2 px-4 py-2 text-gray-700"
                >
                    {loading ? <Spin /> : <IoReload className="text-lg" />}
                </button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={user.photo}
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
                                <td className="px-6 py-4">
                                    {user.contactNumber}
                                </td>
                                <td className="px-6 py-4">{user.country}</td>
                                <td className="px-6 py-4">
                                    <div className="text-base font-semibold">
                                        {user.documentNumber}
                                    </div>
                                    <div className="font-normal text-gray-500">
                                        {user.documentType}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                className="mt-4"
                current={currentPage}
                total={filteredUsers.length}
                pageSize={usersPerPage}
                onChange={onPageChange}
                showSizeChanger={false}
            />
        </div>
    );
}

export default UsersDashboard;
