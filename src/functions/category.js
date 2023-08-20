import axios from 'axios'

export const getCategories = async () => {
    // return await axios.get('http://localhost:8000/api/categories')
    return await axios.get(process.env.REACT_APP_API+'/categories')
}

export const getCategory = async (slug) => {
    // return await axios.get(`http://localhost:8000/api/category/${slug}`)
    return await axios.get(process.env.REACT_APP_API+`/category/${slug}`)
}

export const getCategoryById = async (_id) => {
    // return await axios.get(`http://localhost:8000/api/categoryById/${_id}`)
    return await axios.get(process.env.REACT_APP_API+`/categoryById/${_id}`)
}

export const createCategory = async (category, authtoken) => {
    // return await axios.post(`http://localhost:8000/api/category`, category, {
    return await axios.post(process.env.REACT_APP_API+`/category`, category, {
        headers: {
            authtoken,
        }
    })
}

export const removeCategory = async (slug, authtoken) => {
    // return await axios.delete(`http://localhost:8000/api/category/${slug}`, {
    return await axios.delete(process.env.REACT_APP_API+`/category/${slug}`, {
        headers: {
            authtoken,
        }
    })
}

export const updateCategory = async (slug, category, authtoken) => {
    // return await axios.put(`http://localhost:8000/api/category/${slug}`, category, {
    return await axios.put(process.env.REACT_APP_API+`/category/${slug}`, category, {
        headers: {
            authtoken,
        }
    })
}

export const getCategorySubs = async (_id) => {
    // return await axios.get(`http://localhost:8000/api/category/subs/${_id}`)
    return await axios.get(process.env.REACT_APP_API+`/category/subs/${_id}`)
}

