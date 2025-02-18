import { Button, Pagination, Switch } from "antd";
import { useEffect, useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import {
  getAllVideos,
  toggleVideoStatus,
} from "../../../services/video-service";
import TrustedCompaniesModal from "../modals/trusted-companies-modals-dashboard";

function TrustedCompaniesDashboard() {
  const [videosData, setVideosData] = useState<any[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openCreateVideoModal, setOpenCreateVideoModal] =
    useState<boolean>(false);

  const { userRole } = useAuth();

  const navigate = useNavigate();

  const specificRole: string = "ADMIN";
  useEffect(() => {
    if (userRole && userRole.some((role) => role === specificRole)) {
      handleReload();
    } else {
      navigate("/dashboard");
    }
  }, [userRole]);

  useEffect(() => {
    const timeoutId = setTimeout(() => handleReload(), 400);
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  const handleReload = async () => {
    setLoading(true);
    try {
      const response = await getAllVideos();
      setVideosData(response);
    } catch (error) {
      console.error("Error al cargar los videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (id: number) => {
    try {
      await toggleVideoStatus(id);
      handleReload();
    } catch (error) {
      console.error("Error al aprobar el video:", error);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="h-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Button
            onClick={() => setOpenCreateVideoModal(true)}
            className="max-sm:hidden flex items-center gap-x-2 mb-5"
          >
            <HiMiniPlus className="text-lg" />
            Crear empresa de confianza
          </Button>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="w-fit">
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  URL
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {videosData.map((video, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{video.id}</td>
                  <td className="px-6 py-4">{video.url}</td>
                  <td className="px-2 py-4">{video.name}</td>
                  <td className="px-2 py-4">
                    <Switch
                      checkedChildren="Mostrar"
                      unCheckedChildren="Ocultar"
                      checked={video.isShowed}
                      onChange={() => handleChangeStatus(video.id)}
                      className="bg-gray-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TrustedCompaniesModal
        open={openCreateVideoModal}
        setOpen={setOpenCreateVideoModal}
        handleReload={handleReload}
      />
      <Pagination
        className="mt-4"
        current={currentPage + 1}
        total={videosData.length}
        pageSize={10}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default TrustedCompaniesDashboard;
