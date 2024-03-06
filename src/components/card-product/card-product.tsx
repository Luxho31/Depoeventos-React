
export default function CardProduct() {
    return (
        // <div className="bg-indigo-500 border-black w-80 h-96">
        //     {/* <img src="https://cdn-www.bluestacks.com/bs-images/com.netease.tjtw_.jpg" alt="" /> */}
        //     <div className="bg-green-600 h-60"></div>
        //     <div className="bg-orange-500">
        //         CardProduct
        //     </div>
        // </div>
        <div className="bg-gray-100 border-black shadow-lg w-80 h-96 rounded-xl">
            <div className="h-60 rounded-t-xl relative">
                <img
                    src="https://www.freepnglogos.com/uploads/tom-and-jerry-png/tom-and-jerry-hamera-deviantart-14.png"
                    className="h-60 left-0 translate-x-1/2 absolute"
                    alt=""
                />
                <div className="bg-blue-500 rounded-t-xl rounded-b-lg h-36" />
            </div>
            <div className="h-36 rounded-b-xl">
                <span>Hola Soy Luis</span>
            </div>
        </div>
    )
}
