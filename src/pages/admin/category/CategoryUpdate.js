import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategory, updateCategory } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import FileUpload from '../../../components/forms/FileUpload'

const CategoryUpdate = () => {

  const {user} = useSelector(state => ({...state}))
  const {slug} = useParams()
  const navigate = useNavigate()

  const [values, setValues] = useState({name: '', images: []});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () => getCategory(slug).then(c => setValues(c.data))

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    updateCategory(slug, values, user.token)
    .then(res => {
      setLoading(false)
      setValues({name: '', images: []})
      toast.success(`${res.data.name} is updated`);
      navigate('/admin/category');
    })
    .catch (err => {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    })
  }

  return (
    <div className='flex'>
      <div className='bg-blue-300 min-w-[12rem]'>
        <AdminNav />
      </div>
      <div className='bg-blue-100 w-[100%] p-3'>
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Update Category</h4>}
        <hr />
        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
        <CategoryForm handleSubmit={handleSubmit} values={values} handleChange={handleChange} />
      </div>
    </div>
  )
}

export default CategoryUpdate