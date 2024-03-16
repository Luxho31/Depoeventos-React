import { useAuth } from "../../../context/AuthProvider";
import { Image } from 'antd';
import banner from "../../../assets/image/AFTER SCHOOL PROGRAM 2024 - DEPOEVENTOS BANNER.png"
import TypingEffect from "../../../utils/typing-effect";
import "./home-dashboard.css"

export default function HomeDashboard() {
	const { userInfo } = useAuth();

	return (
		<>
			<div className="flex items-center mb-20">
				<div className="w-[70%] ms-8 font-mono text-5xl">
					<p className="mb-4">Bienvenido a tu Area Personal</p>
					<TypingEffect text={userInfo?.firstName + " " + userInfo?.lastName} />
				</div>
				<div className=" w-[30%] flex justify-center">
					<img src="https://static.vecteezy.com/system/resources/previews/026/852/344/original/cute-kid-boy-play-basketball-cartoon-flat-style-illustration-generative-ai-png.png" className="w-1/2 m-8" alt="" />
				</div>
			</div>
			<div className=" flex justify-around">
				<Image
					width={500}
					src={banner}
					className="rounded-xl shadow-lg"
				/>
				<Image
					width={500}
					src={banner}
					className="rounded-xl shadow-lg"
				/>
				<Image
					width={500}
					src={banner}
					className="rounded-xl shadow-lg"
				/>
			</div>
		</>
	);
}