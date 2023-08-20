import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const TopCategories = ({title, topCategories, path}) => {

  const navigate = useNavigate();

  return (
    <div className='flex flex-col my-2 justify-center items-center bg-white shadow-sm'>
      <h4 className='font-bold text-3xl text-center py-6'>{title}</h4>
      <div className='flex flex-wrap relative justify-center items-center p-2'>
        {topCategories && topCategories.map((c) => (
          <Link to={`${path}/${c._id}`} key={c._id} className='items flex justify-center items-center flex-col border cursor-pointer hover:shadow-md m-2 p-2'>
            <img className='max-h-[7rem] max-w-[7rem]' src={c.images[0].url} alt="img" />
            <h4 className='my-2'>{c.name}</h4>
          </Link> 
        ))}
        </div>
      </div>
  )
}

export default TopCategories