import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
const defaultTshirt = require('../../images/DefaultTshirt.jpg')

const AdminProductCard = ({product, handleRemove}) => {
    const {title, description, images, slug} = product;

  return (
    <div className='flex flex-col relative shadow-md max-w-[15rem]'>
        <div className=''>
            <img src={images && images.length ? images[0].url : defaultTshirt} alt="item.img" className='' />
        </div>
        <div className='p-3'>
            <h4 className='text-lg font-bold'>{title.substring(0, 20)}</h4>
            <p className=''>{`${description && description.substring(0, 20)}...`}</p>
        </div>
        <div className='flex justify-around pb-3'>
            <Link to={`/admin/product/${slug}`} className='flex justify-center items-center h-full w-full'>
                <FaRegEdit size={20} className='text-orange-500 hover:text-orange-600' />
            </Link>
            <div className='flex justify-center items-center h-full w-full' >
                <AiOutlineDelete size={20} onClick={()=> handleRemove(slug)} className='text-red-500 hover:text-red-600' />
            </div>
        </div>
    </div>
  )
}

export default AdminProductCard