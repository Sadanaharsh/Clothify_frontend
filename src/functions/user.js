import axios from "axios";

export const userCart = async (cart, authtoken) => {
    // return await axios.post(`http://localhost:8000/api/user/cart`, {cart}, {
    return await axios.post(process.env.REACT_APP_API+`/user/cart`, {cart}, {
        headers: {
            authtoken,
        }
    });
}

export const getUserCart = async (authtoken) => {
    // return await axios.get(`http://localhost:8000/api/user/cart`, {
    return await axios.get(process.env.REACT_APP_API+`/user/cart`, {
        headers: {
            authtoken,
        }
    });
}

export const emptyUserCart = async (authtoken) => {
    // return await axios.put(`http://localhost:8000/api/user/cart`, {}, {
    return await axios.put(process.env.REACT_APP_API+`/user/cart`, {}, {
        headers: {
            authtoken,
        }
    });
}

export const saveUserAddress = async (authtoken, address) => {
    // return await axios.post(`http://localhost:8000/api/user/address`, {address}, {
    return await axios.post(process.env.REACT_APP_API+`/user/address`, {address}, {
        headers: {
            authtoken,
        }
    });
}

export const getUserAddress = async (authtoken) => {
    // return await axios.get(`http://localhost:8000/api/user/address`, {
    return await axios.get(process.env.REACT_APP_API+`/user/address`, {
        headers: {
            authtoken,
        }
    });
}

export const applyCoupon = async (authtoken, coupon) => {
    // return await axios.post(`http://localhost:8000/api/user/cart/coupon`, {coupon}, {
    return await axios.post(process.env.REACT_APP_API+`/user/cart/coupon`, {coupon}, {
        headers: {
            authtoken,
        }
    });
}

export const createOrder = async (authtoken, razorpayResponse) => {
    // return await axios.post(`http://localhost:8000/api/user/order`, {razorpayResponse}, {
    return await axios.post(process.env.REACT_APP_API+`/user/order`, {razorpayResponse}, {
        headers: {
            authtoken,
        }
    });
}

export const getUserOrders = async (authtoken) => {
    // return await axios.get(`http://localhost:8000/api/user/orders`, {
    return await axios.get(process.env.REACT_APP_API+`/user/orders`, {
        headers: {
            authtoken,
        }
    });
}

export const getWishlist = async (authtoken) => {
    // return await axios.get(`http://localhost:8000/api/user/wishlist`, {
    return await axios.get(process.env.REACT_APP_API+`/user/wishlist`, {
        headers: {
            authtoken,
        }
    });
}

export const removeWishlist = async (authtoken, productId) => {
    // return await axios.put(`http://localhost:8000/api/user/wishlist/${productId}`, {}, {
    return await axios.put(process.env.REACT_APP_API+`/user/wishlist/${productId}`, {}, {
        headers: {
            authtoken,
        }
    });
}

export const addToWishlist = async (authtoken, productId) => {
    // return await axios.post(`http://localhost:8000/api/user/wishlist`, {productId}, {
    return await axios.post(process.env.REACT_APP_API+`/user/wishlist`, {productId}, {
        headers: {
            authtoken,
        }
    });
}

export const createCashOrderForUser = async (authtoken, COD, couponTrueOrFalse) => {
    // return await axios.post(`http://localhost:8000/api/user/cash-order`, {couponApplied: couponTrueOrFalse, COD}, {
    return await axios.post(process.env.REACT_APP_API+`/user/cash-order`, {couponApplied: couponTrueOrFalse, COD}, {
        headers: {
            authtoken,
        }
    });
}

export const updateUsername = async (authtoken, name) => {
    // return await axios.post(`http://localhost:8000/api/user/update-userDetails`, {name}, {
    return await axios.post(process.env.REACT_APP_API+`/user/update-userDetails`, {name}, {
        headers: {
            authtoken,
        }
    });
}