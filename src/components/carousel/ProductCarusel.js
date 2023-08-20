import React, {useEffect} from 'react'
import ProductScrollCard from '../cards/ProductScrollCard';
import dummyImg from '../../images/blank.jpg'

const ProductCarusel = ({title, products}) => {

  useEffect(() => {
    console.log(products);
  }, [])

  const productWithVarients = Object.keys(products);

  return (
    <div className='flex flex-col my-2 justify-center items-center bg-white shadow-sm'>
      <h4 className='font-bold text-3xl text-center py-6'>{title}</h4>
      <div className='flex p-2 overflow-x-scroll scrollbar-hide w-full relative '>
        {productWithVarients && productWithVarients.map((p) => (
          <ProductScrollCard key={products[p]._id} slug={products[p].slug} image={products[p].images.length > 0 ? products[p].images[0].url : dummyImg} title={products[p].title} description={products[p].description} price={products[p].price} />
        ))}
      </div>
    </div>
  )
}

export default ProductCarusel