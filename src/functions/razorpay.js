import axios from "axios";

export const order = async (authtoken, coupon) => {
    // return await axios.post(`http://localhost:8000/api/payment/order`, {couponApplied: coupon}, {
    return await axios.post(process.env.REACT_APP_API+`/payment/order`, {couponApplied: coupon}, {
        headers: {
            authtoken,
        }
    });
}

export const verify = async (authtoken, response) => {
    // return await axios.post(`http://localhost:8000/api/payment/verify`, response, {
    return await axios.post(process.env.REACT_APP_API+`/payment/verify`, response, {
        headers: {
            authtoken,
        }
    });
}