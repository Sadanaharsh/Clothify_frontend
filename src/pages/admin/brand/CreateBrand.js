import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import FileUpload from '../../../components/forms/FileUpload'
import LocalSearch from '../../../components/forms/LocalSearch'
import {createBrand, getBrands, removeBrand ,updateBrand} from '../../../functions/brand'
import { FaRegEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const CreateCarusel = () => {

  const [values, setValues] = useState({name: '', images: []});
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [keyword, setKeyword] = useState('');
  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => getBrands().then((b) => setBrands(b.data));

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createBrand(values, user.token)
    .then(res => {
        console.log(res);
        window.alert(`${res.data.name} is created`);
        window.location.reload();
    })
    .catch(err => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
    })
  }

  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
        setLoading(true);
        removeBrand(slug, user.token)
        .then(res => {
            setLoading(false)
            toast.error(`${res.data.name} deleted`);
            loadBrands();
        })
        .catch(err => {
            console.log(err);
            setLoading(false)
            toast.error(err.response.data)
        })
        // console.log(slug);
    }
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <div className='flex'>
      <div className='bg-blue-300 min-w-[12rem]'>
        <AdminNav />
      </div>
      <div className='bg-blue-100 w-[100%] p-3'>
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Create Brand</h4>}
        <hr />
        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
        <form onSubmit={handleSubmit}>
          <div className="rounded-md my-2">
            <label className="">Name</label>
            <input onChange={handleChange} name="name" value={values.name} type="text" placeholder="Name" required className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
          </div>
          <div>
            <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
        <br />
        <LocalSearch keyword={keyword} setKeyword={setKeyword}  />
        <hr />
        <div className='flex flex-wrap'>
          {brands.filter(searched(keyword)).map((c) => (
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

export default CreateCarusel