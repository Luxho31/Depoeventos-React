import React, { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { useAuth } from "../../../context/AuthProvider";
import { getAllUsers } from "../../../services/user-service";

type UserData = {
  id: number,
  username: string,
  country: string,
  firstName: string,
  lastName: string,
  motherLastName: string,
  documentType: string,
  documentNumber: string,
  contactNumber: any,
  emergencyContactNumber: any,
  address: string,
  birthDate: string,
  roles: []
}

function UsersDashboard() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { userRole } = useAuth();
  const usersPerPage: number = 5;

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
    }
  }, [userRole]);

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

  const indexOfLastUser: number = currentPage * usersPerPage;
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage;
  const filteredUsers: UserData[] = userData.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers: UserData[] = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages: number = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="h-screen">
      <button
        onClick={handleReload}
        className="pb-8 border mb-5 shadow-md flex h-2 px-4 py-2 bg-white rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        {loading ? "Loading..." : <IoReload className="text-lg" />}
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
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
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
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
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between flex-column flex-wrap md:flex-row pt-4"
          aria-label="Table navigation"
        >
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 &&
                    "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UsersDashboard;
