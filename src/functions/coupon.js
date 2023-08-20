import axios from "axios";

export const getCoupons = async () => {
    // return await axios.get(`http://localhost:8000/api/coupons`);
    return await axios.get(process.env.REACT_APP_API+`/coupons`);
}

export const removeCoupon = async (couponId, authtoken) => {
    // return await axios.delete(`http://localhost:8000/api/coupon/${couponId}`, {
    return await axios.delete(process.env.REACT_APP_API+`/coupon/${couponId}`, {
        headers: {
            authtoken,
        }
    });
}

export const createCoupon = async (coupon, authtoken) => {
    // return await axios.post(`http://localhost:8000/api/coupon`, {coupon}, {
    return await axios.post(process.env.REACT_APP_API+`/coupon`, {coupon}, {
        headers: {
            authtoken,
        }
    });
}