import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='min-h-[100vh]'>
        <ul className='flex flex-col p-2 w-[100%]'>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/dashboard'} className='text-blue-900'>DASHBOARD</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/products'} className='text-blue-900'>ALL PRODUCTS</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/product'} className='text-blue-900'>PRODUCT</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/category'} className='text-blue-900'>CATEGORY</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/sub'} className='text-blue-900'>SUB CATEGORY</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/brand'} className='text-blue-900'>BRAND</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/carousel'} className='text-blue-900'>CAROUSEL</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/admin/coupon'} className='text-blue-900'>COUPON</Link>
            </li>
            <li className='p-1 flex items-center px-2 rounded-sm text-base my-2 font-semibold hover:bg-blue-50 shadow-sm'>
                <Link to={'/forgot/password'} className='text-blue-900'>PASSWORD</Link>
            </li>
        </ul>
    </nav>
  )
}

export default AdminNav