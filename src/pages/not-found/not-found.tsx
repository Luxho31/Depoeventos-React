import { Link } from 'react-router-dom'
import ImagenNotFound from '../../assets/image/mike_wazowski.png'

export default function NotFound() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex gap-36'>
                <img src={ImagenNotFound} alt="" />
                <div className='w-[40rem] flex flex-col justify-around'>
                    <p className='font-bold text-8xl'>OOPS! PAGINA NO ENCONTRADA.</p>
                    <p className='text-3xl'>
                        Has elegido una puerta equivocada porque no he podido encontrar la página que buscas :(
                    </p>
                    <div>
                        <Link to={"/"} className='bg-orange-500 text-white text-lg font-bold py-4 px-12 rounded-lg'>
                            Regresa a DepoEventos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
