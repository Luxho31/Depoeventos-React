
export default function CampusCard({ data }: any) {
    return (
        <div className="w-[90%] h-[28rem] m-auto mb-20 rounded-2xl flex shadow-md">
            <div className="w-1/2 h-full flex flex-col justify-center items-center max-xl:w-full">
                <div className="px-12">
                    <h3 className="text-md font-medium">{data.direction}</h3>
                    <h2 className="text-3xl font-extrabold mb-3">{data.title}</h2>
                    <p className="text-sm">
                        {data.description}
                    </p>
                </div>
                <img
                    // src="https://educacionalfuturo.com/wp-content/uploads/2018/08/Logo-SP.png"
                    src={data.logo}
                    className="w-20 pt-8"
                    alt=""
                />
            </div>
            <div className="w-1/2 h-full flex justify-center items-center max-xl:hidden">
                <img
                    // src="https://www.colsanpedro.com/imagenes/DSC_0014.jpg"
                    src={data.image}
                    className="rounded-3xl object-cover !w-[90%] !h-[80%] shadow-xl"
                    alt=""
                />
            </div>
        </div>
    )
}
