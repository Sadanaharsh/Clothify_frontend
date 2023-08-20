import React from 'react'
import { Link } from 'react-router-dom'

const ProductScrollCard = ({slug ,image, title, description, price}) => {
  return (
    <Link to={`/product/${slug}`} className='flex space-y-2 flex-col mx-2 min-w-[15rem] text-black shadow-sm hover:shadow-lg p-4'>
        <div className=''>
            <img src={image} alt="img" className='max-h-64' />
        </div>
        <div className=''>
            <div className='font-semibold text-base text-blue-900 hover:text-blue-700'>{title.substring(0, 25)}...</div>
        </div>
        <div className=''>
            <div className='text-blue-900 hover:text-blue-700'>{description.substring(0, 25)}...</div>
        </div>
        <div className=''>
            <div className='text-base text-green-700'>{`Under ₹${price}`}</div>
        </div>
        <div className=''>
            <div className=''>
                
            </div>
            <div className=''>
                
            </div>
        </div>
    </Link>
  )
}

export default ProductScrollCard