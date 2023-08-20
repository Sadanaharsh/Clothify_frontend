import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getProduct, productStar, getRelated} from '../functions/product'
import StarRatings from 'react-star-ratings'
import SingleProduct from '../components/cards/SingleProduct'
import ProductScrollCard from '../components/cards/ProductScrollCard'

const Product = () => {

    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);

    const {slug} = useParams();
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    const loadSingleProduct = () => {
        getProduct(slug).then(res => {
            setProduct(res.data);
            // load related
            getRelated(res.data._id).then(res => setRelated(res.data));
        });
    } 

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        // console.table(newRating, name);
        productStar(name, newRating, user.token)
        .then(res => {
            // console.log('rating clicked: ', res.data);
            loadSingleProduct();
        })
    }

  return (
    <div className=''>
        <div className=''>
            <SingleProduct product={product} onStarClick={onStarClick} star={star} />
        </div>
        <div className='flex flex-col my-2 justify-center items-center bg-white shadow-sm'>
            <h4 className='font-bold text-3xl text-center py-6'>Related Products</h4>
            <div className='flex flex-wrap relative justify-center items-center p-2'>
                {related.length ? related.map((r) => 
                    <div key={r._id} className='max-w-[15rem]' >
                        <ProductScrollCard slug={r.slug} image={r.images[0].url} title={r.title} description={r.description} price={r.price} />
                    </div>) : <div className='text-center col' >No products Found</div>
                }
            </div>
        </div>
    </div>
  )
}

export default Product