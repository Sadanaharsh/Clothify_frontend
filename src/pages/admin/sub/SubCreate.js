import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { FaRegEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import { getCategories } from '../../../functions/category'
import { createSub, getSubs, removeSub } from '../../../functions/sub'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {

    const {user} = useSelector(state => ({...state}));
    const {slug} = useParams();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [subs, setSubs] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () => getCategories().then((c) => {
        setCategories(c.data);
    });

    const loadSubs = () => getSubs().then((s) => {
        setSubs(s.data);
    });

    const handleChange = (e) => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({name, parent: category}, user.token)
        .then(res => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is created`);
        loadSubs();
        })
        .catch(err => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        }) 
    }

    const handleRemove = (slug) => {
        if (window.confirm('Delete?')) {
            setLoading(true);
            removeSub(slug, user.token)
            .then(res => {
              setLoading(false);
              toast.error(`${res.data.name} deleted`);
              loadSubs();
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
              toast.error(err.response.data);
            })
        }
    }

    const searched  = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='flex'>
      <div className='bg-blue-300 min-w-[12rem]'>
        <AdminNav />
      </div>
      <div className='bg-blue-100 w-[100%] p-3'>
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Create Sub Category</h4>}

        <div className="rounded-md shadow-sm my-2">
            <label htmlFor="categoryName" className="">Parent Category</label>
            <select name="category" onChange={e => setCategory(e.target.value)} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm' >
                <option>Please Select</option>
                {categories.length > 0 && categories.map(c => <option key={c._id} value={c._id}> {c.name} </option>)}
            </select>
        </div>

        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
        <br />
        <LocalSearch keyword={keyword} setKeyword={setKeyword}  />
        <hr />
        {subs.filter(searched(keyword)).map((s) => (
            <div className='flex w-full my-2 h-10 justify-between items-center p-4 bg-white shadow-sm'  key={s._id} >
                {s.name}
                <div className='flex space-x-4'>
                    <span onClick={() => handleRemove(s.slug)} className='cursor-pointer'>
                        <AiOutlineDelete className='text-red-500 hover:text-red-800' />
                    </span>
                    <Link to={`/admin/sub/${s.slug}`}>
                        <span className=''>
                            <FaRegEdit className='text-orange-500 hover:text-orange-800' />
                        </span>
                    </Link>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SubCreate