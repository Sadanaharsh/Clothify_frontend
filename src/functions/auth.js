import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
    // return await axios.post('http://localhost:8000/api/create-or-update-user', {}, {
    return await axios.post(process.env.REACT_APP_API+'/create-or-update-user', {}, {
        headers: {
            authtoken,
        }
    })
}

export const currentUser = async (authtoken) => {
    // return await axios.post('http://localhost:8000/api/current-user', {}, {
    return await axios.post(process.env.REACT_APP_API+'/current-user', {}, {
        headers: {
            authtoken,
        }
    })
}

export const currentAdmin = async (authtoken) => {
    // return await axios.post('http://localhost:8000/api/current-admin', {}, {
    return await axios.post(process.env.REACT_APP_API+'/current-admin', {}, {
        headers: {
            authtoken,
        }
    })
}