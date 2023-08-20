import axios from "axios";

export const getCrousel = async () => {
    // return await axios.get(`http://localhost:8000/api/carousel`);
    return await axios.get(process.env.REACT_APP_API+`/carousel`);
}

export const createCrousel = async (values, authtoken) => {
    // return await axios.post(`http://localhost:8000/api/carousel/create`, values, {
    return await axios.post(process.env.REACT_APP_API+`/carousel/create`, values, {
      headers: {
          authtoken,
      },
    });
  }

