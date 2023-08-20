import axios from "axios";

export const getBrand = async (_id) => {
    // return await axios.get(`http://localhost:8000/api/brand/${_id}`);
    return await axios.get(process.env.REACT_APP_API+`/brand/${_id}`);
}
  
export const getBrands = async () => {
  // return await axios.get(`http://localhost:8000/api/brands`);
  return await axios.get(process.env.REACT_APP_API+`/brands`);
}

export const createBrand = async (brand, authtoken) => {
    // return await axios.post(`http://localhost:8000/api/brand`, brand, {
    return await axios.post(process.env.REACT_APP_API+`/brand`, brand, {
      headers: {
          authtoken,
      },
    });
  }

export const removeBrand = async (slug, authtoken) => {
  // return await axios.delete(`http://localhost:8000/api/brand/${slug}`, {
  return await axios.delete(process.env.REACT_APP_API+`/brand/${slug}`, {
    headers: {
        authtoken,
    },
  });
}

export const updateBrand = async (slug, product, authtoken) => {
  // return await axios.put(`http://localhost:8000/api/brand/${slug}`, product, {
  return await axios.put(process.env.REACT_APP_API+`/brand/${slug}`, product, {
    headers: {
        authtoken,
    },
  });
}

