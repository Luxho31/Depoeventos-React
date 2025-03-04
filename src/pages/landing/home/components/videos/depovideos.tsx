import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getAllApprovedVideos } from "../../../../../services/video-service";
import { Empty } from "antd";

const YouTubeVideo = ({ url }: any) => {
  const videoId = getYouTubeVideoId(url);

  const opts = {
    height: "200",
    width: "340",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      rel: 0,
      loop: 1,
      fs: 0,
      iv_load_policy: 3,
      list_type: "user_uploads",
    },
  };

  return (
    <div className="rounded-xl overflow-hidden select-none pointer-events-none">
      {videoId ? (
        <YouTube videoId={videoId} opts={opts} />
      ) : (
        <p>URL inválida</p>
      )}
    </div>
  );
};

const getYouTubeVideoId = (url: any) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function DepoVideos() {
  const [data, setData] = useState<any[]>([]);

  const handleLoadIsShowed = async () => {
    const response = await getAllApprovedVideos();
    setData(response);
  };

  useEffect(() => {
    handleLoadIsShowed();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[80%] m-auto mb-10 mt-20">
        <div className="mb-12">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            Nuestros talleres
          </h1>
          <p className="leading-6 text-justify">
            Contamos con instructores especializados que, con su experiencia y
            pasión, te guiarán en el aprendizaje y dominio de diversas
            disciplinas deportivas. Descubre lo que nuestros estudiantes y
            padres tienen para decir sobre su experiencia con nosotros.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center ">
          {data.length === 0 && (
            
              <Empty description="No hay videos disponibles" />
            
          )}
          {data.map((data: any) => (
            <YouTubeVideo url={data.url} />
          ))}
        </div>
      </div>
    </div>
  );
}
