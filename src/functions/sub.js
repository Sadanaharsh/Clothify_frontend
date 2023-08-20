import axios from "axios";

export const getSubs = async () => {
  // return await axios.get('http://localhost:8000/api/subs');
  return await axios.get(process.env.REACT_APP_API+'/subs');
}

export const getSub = async (slug) => {
  // return await axios.get(`http://localhost:8000/api/sub/${slug}`);
  return await axios.get(process.env.REACT_APP_API+`/sub/${slug}`);
}

export const getSubsByCategory = async (_id) => {
  // return await axios.get(`http://localhost:8000/api/subsByCategory/${_id}`);
  return await axios.get(process.env.REACT_APP_API+`/subsByCategory/${_id}`);
}

export const removeSub = async (slug, authtoken) => {
  // return await axios.delete(`http://localhost:8000/api/sub/${slug}`, {
  return await axios.delete(process.env.REACT_APP_API+`/sub/${slug}`, {
    headers: {
        authtoken,
    },
  });
}

export const updateSub = async (slug, sub, authtoken) => {
  // return await axios.put(`http://localhost:8000/api/sub/${slug}`, sub, {
  return await axios.put(process.env.REACT_APP_API+`/sub/${slug}`, sub, {
    headers: {
        authtoken,
    },
  });
}

export const createSub = async (sub, authtoken) => {
  // return await axios.post(`http://localhost:8000/api/sub`, sub, {
  return await axios.post(process.env.REACT_APP_API+`/sub`, sub, {
    headers: {
        authtoken,
    },
  });
}

