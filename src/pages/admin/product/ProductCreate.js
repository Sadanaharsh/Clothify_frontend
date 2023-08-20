import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {createProduct} from '../../../functions/product'
import {getBrands} from '../../../functions/brand'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {getCategories, getCategorySubs} from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import FileUpload from '../../../components/forms/FileUpload'

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Red', 'Black', 'White', 'Blue', 'Brown', 'Yellow', 'Orange', 'Pink', 'Grey', 'Green', 'Purple'],
  genders: ['Men', 'Women', 'Unisex'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  color: '',
  size: '',
  gender: '',
  brand: '',
} 

const ProductCreate = () => {

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [brandObjects, setBrandObjects] = useState([])
  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  const loadCategories = () => getCategories().then((c) => {
      setValues({...values, categories: c.data});
  });

  const loadBrands = () => getBrands().then((b) => {
      // setValues({...values, brands: b.data});
      setBrandObjects(b.data)
  });

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('CLICKED CATEGORY', e.target.value);
    setValues({...values, subs: [], category: e.target.value});
    setSelectedSubs([]);
    getCategorySubs(e.target.value)
    .then(res => {
        console.log('SUB OPTIONS ON CATEGORY CLICKED', res.data);
        setSubOptions(res.data);
    })
    setShowSub(true);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
    .then(res => {
        console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
    })
    .catch(err => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
    })
  }

  return (
    <div className='flex'>
      <div className='bg-blue-300 min-w-[12rem]'>
        <AdminNav />
      </div>
      <div className='bg-blue-100 w-[100%] p-3'>
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Create Product</h4>}
        <hr />
        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
        <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} handleCategoryChange={handleCategoryChange} subOptions={subOptions} showSub={showSub} setValues={setValues} setShowSub={setShowSub} selectedSubs={selectedSubs} setSelectedSubs={setSelectedSubs} brandObjects={brandObjects} />
      </div>
    </div>
  )
}

export default ProductCreate