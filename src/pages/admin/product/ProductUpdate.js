import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {getProduct, updateProduct} from '../../../functions/product'
import {getCategories, getCategorySubs} from '../../../functions/category'
import {getBrands} from '../../../functions/brand'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import FileUpload from '../../../components/forms/FileUpload'
import AdminNav from '../../../components/nav/AdminNav'

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

const ProductUpdate = () => {

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [brandObjects, setBrandObjects] = useState([])

    const {user} = useSelector((state) => ({...state}));
    let {slug} = useParams(); 
    const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadProduct();
    loadBrands();
  }, []);

  const loadProduct = () => getProduct(slug).then((p) => {
    // console.log(p);
    setValues({...values, ...p.data});

    getCategorySubs(p.data.category._id)
    .then(res => {
        setSubOptions(res.data);
    });
    let arr = [];
    p.data.subs.map((s) => {
        arr.push(s._id);
    });
    setArrayOfSubs((prev) => arr);
  });

  const loadCategories = () => getCategories().then((c) => {setCategories(c.data)});

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
    setValues({...values, subs: []});

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value)
    .then(res => {
        console.log('SUB OPTIONS ON CATEGORY CLICKED', res.data);
        setSubOptions(res.data);
    })
    if (values.category._id === e.target.value) {
        loadProduct();
    }
    setArrayOfSubs([]);
    setShowSub(true);
  }


const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
    .then(res => {
        console.log(res);
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        navigate('/admin/products');
    })
    .catch(err => {
        console.log(err);
        setLoading(false);
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
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Update Product</h4>}
        <hr />
        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
        <ProductUpdateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} handleCategoryChange={handleCategoryChange} subOptions={subOptions} showSub={showSub} setValues={setValues} setShowSub={setShowSub} categories={categories} arrayOfSubs={arrayOfSubs} setArrayOfSubs={setArrayOfSubs} selectedCategory={selectedCategory} brandObjects={brandObjects} />
      </div>
    </div>
  )
}

export default ProductUpdate