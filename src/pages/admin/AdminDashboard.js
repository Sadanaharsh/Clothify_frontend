import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getOrders, changeStatus } from '../../functions/admin'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
// import Orders from '../../components/order/Orders'

const AdminDashboard = () => {

    const { user } = useSelector((state) => ({ ...state }));

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        getOrders(user.token).then(res => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        })
    }

    const handleStatusChange = (orderId, orderStatus) => {
        console.log("Order_ID = ", orderId, " Order_Status = ", orderStatus);
        changeStatus(user.token, orderId, orderStatus).then(res => {
            toast.success('Status updated');
            loadOrders();
        })
    }

    const showOrderInTable = (order) => (
        <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-blue-300 border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Title
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Price
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Color
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Count
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Shipping
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((p, i) => (
                                    p && <tr key={i} className="bg-blue-100 border-b transition duration-300 ease-in-out hover:bg-blue-200">
                                        {p.product && <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer font-medium text-gray-900">
                                            {p.product.title}
                                        </td>}
                                        {p.product && <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {p.product.price}
                                        </td>}
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {p.color}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {p.count}
                                        </td>
                                        {p.product && <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {p.product.shipping === 'Yes' ? <AiOutlineCheckCircle className='text-green-500 font-semibold cursor-pointer' /> : <AiOutlineCloseCircle className='text-red-500 font-semibold cursor-pointer' />}
                                        </td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className='flex overflow-x-scroll scrollbar-hide'>
            <div className='bg-blue-300 min-w-[12rem]'>
                <AdminNav />
            </div>
            <div className='bg-blue-100 w-[100%] p-3 overflow-x-scroll scrollbar-hide'>
                <h4 className='text-xl font-semibold'>All Orders</h4>
                <div className="">
                    {orders.map((order) => (
                        <div key={order._id} className='bg-blue-50 shadow-md my-2 p-4 rounded-sm' >
                            <div className="">
                                {/* <ShowPaymentInfo order={order} showStatus={false} /> */}
                                <div className="">
                                    <div className="rounded-md my-2">
                                        <label className="">Delivery Status</label>
                                        <select onChange={e => handleStatusChange(order._id, e.target.value)} name='status' defaultValue={order.orderStatus} className='relative block w-full px-3 py-2 border border-blue-300 placeholder-black text-green-900 font-semibold rounded bg-blue-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
                                            <option value="Not_Processed">Not Processed</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Dispatched">Dispatched</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cash On Delivery">Cash On Delivery</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    {showOrderInTable(order)}
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}



export default AdminDashboard