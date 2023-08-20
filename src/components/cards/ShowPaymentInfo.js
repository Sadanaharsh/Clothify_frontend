import React from 'react'

const ShowPaymentInfo = ({order, showStatus = true}) => {
  return (
    <div className=''>
        <p>
            <span>Order Id: {order.paymentIntent.id}</span> {' / '}
            <span>
                Amount: {' '}    
                {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'INR',
                })}
            </span> {' / '}
            <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span> {' / '}
            <span>Receipt: {order.paymentIntent.receipt}</span> {' / '}
            <span>Order on: {new Date(order.paymentIntent.created_at * 1000).toLocaleString()}</span> {' / '}
            {showStatus && <><br /><span className='bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900'>STATUS: {order.orderStatus}</span></>}
        </p>
    </div>
  )
}

export default ShowPaymentInfo