import React, {useState} from 'react'
import { Card} from 'antd'
import { Carousel } from 'react-responsive-carousel';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import _ from 'lodash';
import { addToWishlist } from '../../functions/user'
import ProductListItems from './ProductListItems';
// import RatingModal from '../modal/RatingModal';


const SingleProduct = ({product, onStarClick, star}) => {

    // const {title, images, description, price, gender, size, color, _id} = product;
    const {images} = product;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}));

    const [tooltip, setTooltip] = useState('Click To add');

    const handleAddToCart = () => {
        // Create Cart Array
        let cart = [];
        if (typeof window !== 'undefined') {
          // if cart is in localstorage GET it
          if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
          }
          // Push new product to cart
          cart.push({
            ...product,
            count: 1,
          });
          // Remove duplicate
          let unique = _.uniqWith(cart, _.isEqual);
  
          // Save to localStorage
          // console.log('unique', unique);
          localStorage.setItem('cart', JSON.stringify(unique));
  
          // show tooltip
          setTooltip('Added');
          toast.success('Item Added Into Cart')
  
          // add to redux state
          dispatch({
            type: 'ADD_TO_CART',
            payload: unique,
          })

          dispatch({
            type: 'SET_VISIBLE',
            payload: true,
          })
        }
    }

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(user.token, product._id).then(res => {
            // console.log('ADDED TO WISHLIST', res.data);
            toast.success('Added to Wishlist');
            // navigate('/user/wishlist');
        })
    }

    const handleBuyNow = () => {
      // console.log('BUY NOW');
      handleAddToCart();
      navigate('/cart');
    }

  return (
    <div className=''>
        <div className='grid grid-cols-1 sm:grid-cols-2 shadow-md'>
            <div className='p-2 md:pt-4'>
                {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop >
                        {images && images.map((i) => <img src={i.url} key={i.public_id} alt='product.img' className='max-w-[25rem]' />)}
                    </Carousel> : (
                        <Card
                            cover={
                                <img src={'http://www.fogtechnologies.in/assets/img/no_blog.jpg'} alt='product.img' className='mb-3 .card-img' />
                            }
                            >
                            
                        </Card>
                    )
                }
            </div>
            <div className='sm:col-span-1 p-2 pt-0'>
                <ProductListItems product={product} brand={product.brand} onStarClick={onStarClick} star={star} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist} handleBuyNow={handleBuyNow} />
            </div>
        </div>
        
    </div>
  )
}

export default SingleProduct