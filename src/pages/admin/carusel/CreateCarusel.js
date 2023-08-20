import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {getCrousel, createCrousel} from '../../../functions/crousel'
import {toast} from 'react-toastify'
import FileUpload from '../../../components/forms/FileUpload'

const CreateCarusel = () => {

    const [values, setValues] = useState({crousel_id: 'default_1', images: []});
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadCarousel();
    }, [])

    const loadCarousel = () => getCrousel().then((res) => {
        // console.log(JSON.stringify(res.data));
        setValues({...values, ...res.data[0]});
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        createCrousel(values, user.token)
        .then(res => {
            console.log(res);
            toast.success('Crousel is created')
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
        {loading ? <h4 className='font-bold text-xl text-red-600'>Loading...</h4> : <h4 className='font-bold text-xl'>Create Carusel</h4>}
        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
        <form onSubmit={handleSubmit}>
            <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700">
            Save
            </button>
        </form>
        {values.images && 
            values.images.map((image) => (
                <div key={image.public_id} className='flex flex-col relative m-4 shadow-md'>
                    <img src={image.url} alt="img" className='' />
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default CreateCarusel