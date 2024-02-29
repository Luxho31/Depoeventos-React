import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'

export default function RutaGeneral() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
