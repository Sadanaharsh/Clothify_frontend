import React, {useEffect, useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getProductsByCount } from '../../../functions/product'
import { removeProduct } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

const AllProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100).then((res) => {
      setLoading(false);
      setProducts(res.data)
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }

  const handleRemove = (slug) => {
    if (window.confirm('Delete?')) {
      removeProduct(slug, user.token)
      .then(res => {
        loadAllProducts();
        toast.error(`${res.data.title} is deleted`);
      })
      .catch(err => {
        toast.error()
      })
    }
  }

  return (
    <div className='flex'>
      <div className='bg-blue-300 min-w-[12rem]'>
        <AdminNav />
      </div>
      <div className='bg-blue-100 w-[100%] p-3'>
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>All Products</h4>}
        <div className='flex flex-wrap my-5 space-x-2'>
          {products.map((product) => (
            <div className='col-md-4 pb-3' key={product._id} >
              <AdminProductCard product={product} handleRemove={handleRemove} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllProducts