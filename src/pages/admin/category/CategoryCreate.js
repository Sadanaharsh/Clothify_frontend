import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import { FaRegEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import FileUpload from '../../../components/forms/FileUpload'

const CategoryCreate = () => {

    const {user} = useSelector(state => ({...state}))

    const [values, setValues] = useState({name: '', images: []});
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data))


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // create-category
        createCategory(values, user.token)
        .then(res => {
            setLoading(false);
            setValues({images: [], name: ''});
            toast.success(`${res.data.name} is created`)
            loadCategories();
        })
        .catch(err => {
            console.log(err);
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleRemove = async (slug) => {
        if (window.confirm('Delete?')) {
            setLoading(true);
            // remove-category
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false)
                toast.error(`${res.data.name} deleted`);
                loadCategories();
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                toast.error(err.response.data)
            })
        }
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <div className='flex'>
      <div className='bg-blue-300 min-w-[12rem]'>
        <AdminNav />
      </div>
      <div className='bg-blue-100 w-[100%] p-3'>
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Create Category</h4>}
        <hr />
        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
        <CategoryForm handleSubmit={handleSubmit} name={values.name} handleChange={handleChange} />
        <br />
        <LocalSearch keyword={keyword} setKeyword={setKeyword}  />
        <hr />
        
        <div className='flex flex-wrap'>
          {categories.filter(searched(keyword)).map((c) => (
            <div className='flex flex-col space-y-2 w-40 m-2 p-4 justify-between items-center bg-white shadow-md rounded-md'  key={c._id} >
                <div className='logo bg-white'>
                  <img src={c.images[0].url} alt="img" className='w-full h-full rounded-sm' />
                </div>
                <div className='name text-lg font-semibold text-center'>
                  {c.name}
                </div>
                  <div className='flex space-x-4'>
                      <span onClick={() => handleRemove(c.name)} className='cursor-pointer'>
                          <AiOutlineDelete className='text-red-500 hover:text-red-800' />
                      </span>
                  </div>
              </div>
          ))}
        </div>

      </div>
    </div>
  )
}

// <div className='flex w-full my-2 h-10 justify-between items-center p-4 bg-white shadow-sm'  key={c._id} >
            //     {c.name}
            //     <div className='flex space-x-4'>
            //         <span onClick={() => handleRemove(c.slug)} className='cursor-pointer'>
            //             <AiOutlineDelete className='text-red-500 hover:text-red-800' />
            //         </span>
            //         {/* <Link to={`/admin/category/${c.slug}`}>
            //             <span className=''>
            //                 <FaRegEdit className='text-orange-500 hover:text-orange-800' />
            //             </span>
            //         </Link> */}
            //     </div>
            // </div>

export default CategoryCreate