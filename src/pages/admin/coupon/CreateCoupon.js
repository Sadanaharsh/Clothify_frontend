import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { AiOutlineDelete } from 'react-icons/ai'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon'
import AdminNav from '../../../components/nav/AdminNav'

const CreateCoupon = () => {

    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);

    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () => getCoupons().then(res => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(name, expiry, discount);
        createCoupon({ name, expiry, discount }, user.token).then(res => {
          setLoading(false);
          setName('');
          setDiscount('');
          setExpiry('');
          toast.success(`"${res.data.name}" is created`);
          loadAllCoupons();
        }).catch(err => console.log('create coupon err --> ', err))
      }
    
      const handleRemove = (couponId) => {
        setLoading(true);
        if (window.confirm('Delete?')) {
          removeCoupon(couponId, user.token).then(res => {
            setLoading(false);
            toast.error(`Coupon "${res.data.name}" is deleted`)
            loadAllCoupons();
          }).catch(err => console.log(err))
        }
      }

    const showForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm my-2">
                <div>
                    <label className="">Name</label>
                    <input onChange={(e) => setName(e.target.value)} name="name" value={name} type="text" required autoFocus={true} className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Name" />
                </div>
            </div>
            <div className="rounded-md shadow-sm my-2">
                <div>
                    <label className="">Discount %</label>
                    <input onChange={(e) => setDiscount(e.target.value)} name="discount" value={discount} type="text" required className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Discount" />
                </div>
            </div>
            <div className="rounded-md shadow-sm my-2">
                <div>
                    <label className="">Expiry</label>
                    <DatePicker selected={expiry} name='expiry' value={expiry} required onChange={(date) => setExpiry(date)} placeholder="Expiry" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
                    
                </div>
            </div>
            <div>
                <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700">
                Save
                </button>
            </div>
        </form>
    )

  return (
    <div className='flex'>
      <div className='bg-blue-300 min-w-[12rem]'>
        <AdminNav />
      </div>
      <div className='bg-blue-100 w-[100%] p-3'>
        {loading ? <h4 className='text-xl font-bold text-red-600'>Loading...</h4> : <h4 className='text-xl font-bold'>Coupon</h4>}
        <hr />

        {showForm()}
        <br />
        <h4 className='text-lg font-semibold'>{coupons.length} Coupons</h4>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                    <thead className="bg-white border-b">
                        <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Name
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Expiry
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Discount
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Action
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((c) => (
                            <tr key={c._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {c.name}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {new Date(c.expiry).toLocaleDateString()}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {c.discount}%
                                </td>
                                <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <AiOutlineDelete onClick={() => handleRemove(c._id)} className='text-red-600 cursor-pointer' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default CreateCoupon