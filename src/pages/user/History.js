import React, { useState, useEffect } from 'react'
import { getUserOrders } from '../../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import Invoice from '../../components/order/Invoice'
import ModalImage from "react-modal-image";
import blankImg from '../../images/blank.jpg'
import { order } from '../../functions/razorpay'

const History = () => {

    const { user } = useSelector((state) => ({ ...state }));

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadUserOrders();
    }, []);

    const loadUserOrders = () => {
        getUserOrders(user.token).then(res => {
            // console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        })
    }

    const showOrders = (order) => (
        <div className="shadow-md border rounded-sm">
           {order.products.map((p, i) => (
                <div key={i} className="flex justify-between flex-wrap-reverse items-center px-4 py-4 my-2 bg-gray-100">
                    <div className="flex">
                        <div style={{width: '100px', height: 'auto'}} className='img w-[100px]'>
                            {p.product.images.length ? <ModalImage small={p.product.images[0].url} large={p.product.images[0].url} /> : 
                                <ModalImage small={blankImg} large={blankImg} />
                            }
                        </div>
                        <div className="flex flex-col mx-2 md:text-base ">
                            <Link to={`/product/${p.product.slug}`} className="title md:my-2 md:mt-1 font-semibold text-black hover:text-gray-700">{p.product.title}</Link>
                            <div className="color md:my-1">Color: {p.color}</div>
                            <div className="count md:my-1">Qty: {p.count}</div>
                            <div className="price md:my-1 flex justify-between">
                                <div>
                                    Price: 
                                    <span className='text-green-700 mx-2'>
                                        ₹{p.product.price}
                                    </span> 
                                </div>
                                {showDownloadLink(order)} 
                            </div>
                        </div>
                    </div>
                    <div className="flex mr-2 mb-4">
                        {order.orderStatus === 'Not_Processed' || order.orderStatus === 'Cancelled' ? <span class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">{order.orderStatus}</span>
                         : <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">{order.orderStatus}</span>}
                            
                    </div>
                </div>
           ))}
        </div>
    )

    const showDownloadLink = (order) =>
        <PDFDownloadLink
            document={
            <Invoice order={order} />
            }
            fileName='invoice.pdf'
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-sm inline-flex items-center hover:text-gray-50'
        >
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            <span>Invoice</span>
        </PDFDownloadLink>

    const showEachOrders = () => orders.reverse().map((order, i) => (
        <div key={i} className="">
            {showOrders(order)}
        </div>

    ))

    return (
        <div className=''>
            <h4 className='text-xl text-center my-5  font-semibold'>{orders.length > 0 ? 'User purchase history' : 'No purchase history'}</h4>
            {showEachOrders()}
            
        </div>
    )
}

export default History