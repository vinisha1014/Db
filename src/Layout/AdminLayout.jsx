import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

function AdminLayout() {

  
  // const location = useLocation();

  // useEffect(() => {
  //   const { pathname } = location;
  //   console.log(pathname);
  // }, []);

  return (
    <div className='h-screen w-full p-4 flex items-center justify-between gap-4 bg-gray-900'>
      <div className='h-full w-[17.5%] bg-white rounded-2xl p-4'>
        <h1 className='w-full flex justify-center items-center text-2xl font-bold'>ERP-An Innovation</h1>
        <ul className='w-full mt-8 flex flex-col gap-2'>
          <li className='w-full'>
            <NavLink to="/" className='flex w-full h-full p-2 rounded-md hover:bg-black hover:text-white hover:cursor-pointer'>Employee</NavLink>
          </li>
          <li className='w-full'>
            <NavLink to="/Payroll" className='flex w-full h-full p-2 rounded-md hover:bg-black hover:text-white hover:cursor-pointer'>Payroll</NavLink>
          </li>
          <li className='w-full'>
            <NavLink to="/department" className='flex w-full h-full p-2 rounded-md hover:bg-black hover:text-white hover:cursor-pointer'>Department</NavLink>
          </li>
          <li className='w-full'>
            <NavLink to="/inventory" className='flex w-full h-full p-2 rounded-md hover:bg-black hover:text-white hover:cursor-pointer'>Inventory</NavLink>
          </li>
          <li className='w-full'>
            <NavLink to="/customer" className='flex w-full h-full p-2 rounded-md hover:bg-black hover:text-white hover:cursor-pointer'>Customer</NavLink>
          </li>
          <li className='w-full'>
            <NavLink to="/orders" className='flex w-full h-full p-2 rounded-md hover:bg-black hover:text-white hover:cursor-pointer'>Orders</NavLink>
          </li>
        </ul>
      </div>
      <div className='h-full w-[82.5%] bg-white rounded-2xl p-6'>
        <Outlet />

      </div>
    </div>
  )
}

export default AdminLayout
