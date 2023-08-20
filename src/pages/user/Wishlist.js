import React, {useEffect, useState} from 'react'
import { getWishlist, removeWishlist } from '../../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {AiOutlineDelete} from 'react-icons/ai'
import emptyWishlist from '../../images/empty_wishlist.svg'

const Wishlist = () => {

  const {user} = useSelector((state) => ({...state}));
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token).then(res => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    })
  }

  const handleRemove = (productId) => removeWishlist(user.token, productId).then(res => {
    loadWishlist();
  })

  return (
    <div className=''>
      <h4 className='text-2xl text-center my-5  font-semibold'>My Wishlist</h4>
      <hr />
      <div className="wishlist-card flex flex-wrap mt-10 p-2 justify-center">
        {!wishlist.length ? 
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img src={emptyWishlist} alt="img" className='my-2' />
            <div className="my-2 text-lg font-semibold">Oops! Your Wishlist is Empty</div>
          </div>
         : 
          wishlist.map(p => (
            <div key={p._id} className="flex flex-col justify-center items-center sm:p-2 m-2 rounded-sm shadow-sm hover:shadow-md">
              <Link to={`/product/${p.slug}`} className="img my-1">
                <img src={p.images[0].url} alt="img" className='h-48 sm:h-52 w-auto' />
              </Link>
              <Link to={`/product/${p.slug}`} className="title sm:text-base font-medium my-1 text-black hover:text-gray-700">{p.title.substring(0, 25)}</Link>
              <div className="price text-green-700 my-1">Under<span className='mx-2'>₹{p.price}</span></div>
              <div className="delete text-red-600 my-1">
                <AiOutlineDelete onClick={() => handleRemove(p._id)} className='text-red-600 cursor-pointer' />  
              </div>
            </div>
          ))
        }
        {/* <div className="flex flex-col justify-center items-center p-3 m-3 rounded-sm shadow-sm hover:shadow-md">
          <div className="img my-1">
            <img src="https://res.cloudinary.com/abhaycloud/image/upload/v1666435817/e2vwefdxjmoqfy9keqx4.jpg" alt="img" className='h-48 w-auto' />
          </div>
          <div className="title text-base font-medium my-1">This is title</div>
          <div className="price text-green-700 my-1">Under<span className='mx-2'>₹400</span></div>
        </div> */}
      </div>
    </div>
  )
}

export default Wishlist