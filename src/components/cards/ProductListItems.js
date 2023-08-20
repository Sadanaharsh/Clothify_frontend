import React, { useEffect, useState } from 'react'
import { Radio, Tabs } from 'antd';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating'
import { getProductWithVarients } from '../../functions/product'


const { TabPane } = Tabs;

const ProductListItems = ({ product, brand, onStarClick, star, handleAddToCart, handleAddToWishlist, handleBuyNow }) => {

    // const { title, images, description, price, gender, _id, size, color } = product;
    const { title, description, price, _id, color } = product;

    // const [newSize, setNewSize] = useState(size);
    // const [newColor, setNewColor] = useState(color);
    const [varients, setVarients] = useState({});
    const [product_, setProduct_] = useState({});

    const [newColor, setNewColor] = useState(product_.color)
    const [newSize, setNewSize] = useState(product_.size)

    useEffect(() => {
        loadProductWithVarients();
    }, [product])
    
    const loadProductWithVarients = () => {
        getProductWithVarients(product).then(res => {
            // console.log(res.data);
            let {product_, varients} = res.data;
            setVarients(varients);
            setProduct_(product_);
            
            setNewColor(product_.color)
            setNewSize(product_.size)
        }).catch(err => console.log(err));
    }

    const refreshVarients = (newSize, newColor) => {
        // let url = `http://localhost:3000/product/${varients[newColor][newSize]['slug']}`
        // let url = `https://clothify-frontend-nine.vercel.app/${varients[newColor][newSize]['slug']}`
        let url = process.env.REACT_APP_CLIENT+`/product/${varients[newColor][newSize]['slug']}`
        window.location = url;
    }

    return (
        <div className='flex flex-col shadow-sm p-4'>
            <div className='flex justify-start items-center'>
                <div className='title'>
                    <h4 className='font-semibold text-gray-500'>{brand && brand.name}</h4>
                </div>
            </div>
            <div className='flex justify-start items-center'>
                <div className='title'>
                    <h4 className='text-xl'>{title}</h4>
                </div>
            </div>
            <div className='flex justify-start items-center my-2'>
                <div className=''>
                    <h4 className='font-semibold text-2xl text-green-700'>₹ {price}</h4>
                </div>
            </div>
            <div className='flex justify-start items-center'>
                <div className=''>
                    <h4 className='font-semibold text-red-700 my-2'>Ratings</h4>
                    {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pt-1 pb-3'>No rating yet</div>}
                </div>
            </div>
            <div className='flex justify-between items-center my-2 space-x-4'>
                <div className=''>
                    <h4 className='font-semibold text-gray-500'>Size</h4>
                </div>
                <div className=''>
                    {newSize && newColor && <div className='flex space-x-2'>
                        <Radio.Group value={newSize} buttonStyle="solid" onChange={(e) => refreshVarients(e.target.value, newColor)} >
                            {Object.keys(varients[newColor]).includes('S') && <Radio.Button value="S">S</Radio.Button>}
                            {Object.keys(varients[newColor]).includes('M') && <Radio.Button value="M">M</Radio.Button>}
                            {Object.keys(varients[newColor]).includes('L') && <Radio.Button value="L">L</Radio.Button>}
                            {Object.keys(varients[newColor]).includes('XL') && <Radio.Button value="XL">XL</Radio.Button>}
                            {Object.keys(varients[newColor]).includes('XXL') && <Radio.Button value="XXL">XXL</Radio.Button>}
                            {Object.keys(varients[newColor]).includes('XXXL') && <Radio.Button value="XXXL">XXXL</Radio.Button>}
                        </Radio.Group>
                    </div>}
                </div>
            </div>
            <div className='flex justify-between items-center my-2 space-x-4'>
                <div className=''>
                    <h4 className='font-semibold text-gray-500'>Color</h4>
                </div>
                <div className=''>
                    <div className='flex space-x-2'>
                        {Object.keys(varients).includes('Red') && Object.keys(varients['Red']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Red')}} className={`border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === "Red" ? 'border-black' : 'border-gray-300'}`}></div>}
                        {Object.keys(varients).includes('Blue') && Object.keys(varients['Blue']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Blue')}} className={`border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === "Blue" ? 'border-black' : 'border-gray-300'}`}></div>}
                        {Object.keys(varients).includes('Green') && Object.keys(varients['Green']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Green')}} className={`border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === "Green" ? 'border-black' : 'border-gray-300'}`}></div>}
                        {Object.keys(varients).includes('Yellow') && Object.keys(varients['Yellow']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Yellow')}} className={`border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${color === "Yellow" ? 'border-black' : 'border-gray-300'}`}></div>}
                        {Object.keys(varients).includes('Purple') && Object.keys(varients['Purple']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Purple')}} className={`border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${color === "Purple" ? 'border-black' : 'border-gray-300'}`}></div>}
                        {Object.keys(varients).includes('Grey') && Object.keys(varients['Grey']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Grey')}} className={`border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none ${color === "Grey" ? 'border-black' : 'border-gray-300'}`}></div>}
                        {Object.keys(varients).includes('Black') && Object.keys(varients['Black']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Black')}} className={`border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === "Black" ? 'border-black' : 'border-gray-300'}`}></div>}
                        {Object.keys(varients).includes('Brown') && Object.keys(varients['Brown']).includes(newSize) && <div onClick={() => {refreshVarients(newSize, 'Brown')}} className={`border-2 border-gray-300 ml-1 bg-orange-900 rounded-full w-6 h-6 focus:outline-none ${color === "Brown" ? 'border-black' : 'border-gray-300'}`}></div>}
                    </div>
                </div>
            </div>
            
            <div className='flex justify-start items-center my-4 space-x-2'>
                <button onClick={handleBuyNow} type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700">
                    Buy Now
                </button>
                <button onClick={handleAddToCart} type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700">
                    Add To Cart
                </button>
                <button onClick={handleAddToWishlist} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div className='flex justify-start items-center my-4 space-x-2'>
                <Tabs type='card'>
                    <TabPane tab='Description' key={'1'} >{description && description}</TabPane>
                    <TabPane tab='More' >Call us on xxxx xxx xxx to learn about this product.</TabPane>
                </Tabs>
            </div>
            <hr />
            <div className='flex justify-start items-center my-4 space-x-2 '>
                <RatingModal>
                    <StarRatings
                        name={_id}
                        numberOfStars={5}
                        rating={star}
                        changeRating={onStarClick}
                        isSelectable={true}                                    
                        starRatedColor={'red'}
                    />
                </RatingModal>
            </div>

        </div>
    )
}


export default ProductListItems