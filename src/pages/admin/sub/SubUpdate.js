import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getSub, updateSub } from '../../../functions/sub'
import { getCategories } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

const SubUpdate = () => {

  const {user} = useSelector(state => ({...state}));
  const navigate = useNavigate();
  const {slug} = useParams();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const loadSub = () => 
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(slug, {name, parent}, user.token)
    .then(res => {
      setLoading(false);
      setName('');
      toast.success(`${res.data.name} is updated`);
    //   loadSubs();
        navigate('/admin/sub');
    })
    .catch(err => {
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
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Update Sub Category</h4>}

        <div className="rounded-md shadow-sm my-2">
            <label htmlFor="categoryName" className="">Parent Category</label>
            <select name="category" value={parent} onChange={e => setParent(e.target.value)} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
                <option>Please Select</option>
                {categories.length > 0 && categories.map(c => <option key={c._id} value={c._id}> {c.name} </option>)}
            </select>
        </div>
        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
      </div>
    </div>
  )
}

export default SubUpdate