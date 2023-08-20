import React, {useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import MainCarousel from '../components/carousel/MainCarousel';
import ProductCarusel from '../components/carousel/ProductCarusel';
import TopCategories from '../components/HeadingLinks/TopCategories';
import { getCategories } from '../functions/category';
import { getBrands } from '../functions/brand';
import { getProducts, getProductsByCount, getBlueShirts } from '../functions/product';

const Home = () => {

  const [caruselImages, setCaruselImages] = useState([]);
  const [topBrands, setTopBrands] = useState([]);
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [topCategories, setTopCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const [blueShirts, setBlueShirts] = useState([]);

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, [])

  useEffect(() => {
    loadAllProducts();
    loadBlueShirts();
  }, [page])

  useEffect(() => {
    loadBlueShirts();
  }, [])



  const loadCategories = () => getCategories().then((c) => setTopCategories(c.data))
  const loadBrands = () => getBrands().then((b) => setTopBrands(b.data))
  const loadAllProducts = () => {
    setLoading(true)
    getProducts('createdAt', 'desc', page)
    .then(res => {
      setNewArrivals(res.data);
      // console.log('NEW_ARRIVAL_DATA --> ', res.data);
      // console.log('NEW_ARRIVAL --> ', newArrivals);
      setLoading(false);
    });
    
    setLoading(true)
    getProducts('sold', 'desc', page)
    .then(res => {
      setLoading(false)
      setBestSellers(res.data);
      // console.log('BEST_SELLERS_DATA --> ', res.data);
      // console.log('BEST_SELLERS --> ', bestSellers);
    }).catch(err => {
      setLoading(false);
      console.log(err);
    })
  }

  const loadBlueShirts = () => {
    getBlueShirts().then(res=> {
      console.log(res.data);
      setBlueShirts(res.data);
    })
  }
  

  return (
    <div className='bg-[#F1F3F6]'>
      <MainCarousel />
      <TopCategories title={'Top Categories'} topCategories={topCategories} path={'category'} />
      <TopCategories title={'Top Brands'} topCategories={topBrands} path={'brand'} />
      {/* <ProductCarusel title={'Recommended Products'} products={blueShirts} /> */}
      <ProductCarusel title={'New Arrivals'} products={newArrivals} />
      <ProductCarusel title={'Top Rated'} products={bestSellers} />
    </div>
  )
}

export default Home