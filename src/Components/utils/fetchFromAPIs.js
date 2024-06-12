import axios from "axios";

export const BASE_URL = "http://localhost:8080";
export const BASE_URL_IMG = "http://localhost:8080/public.imgs";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    token: localStorage.getItem("LOGIN_USER"),
    // "content-type": "multipart/form-data",
  },
};

export const fetchFromAPIs = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data.content;
};

export const getDataUser = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/users`);
  console.log(data);
  return data;
};
