import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

const TenantLayout = () => {
  return (
    <>
    <Navbar />
    <div className="pt-14">
    <Outlet />
    </div>
    <Footer />
        
    </>
  )
}

export default TenantLayout