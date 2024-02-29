import React from 'react'
import ImagenNotFound from '../../assets/image/mike_wazowski.png'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex gap-36'>
                <img src={ImagenNotFound} alt="" />
                <div className='w-[40rem] flex flex-col justify-around'>
                    <p className='font-bold text-8xl'>OOPS! PAGE NOT FOUND.</p>
                    <p className='text-3xl'>
                        You must have picked the wrong door because I haven't bee able to lay my eye on the page you've been searching for.
                    </p>
                    <div>
                        <Link to={"/"} className='bg-orange-500 text-white text-lg font-bold py-4 px-12 rounded-lg'>
                            BACK TO HOME
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
