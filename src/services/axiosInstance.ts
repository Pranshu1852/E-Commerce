import axios from 'axios';

const strapiURL = import.meta.env.VITE_STRAPI_URL;

const instance = axios.create({
  baseURL: `${strapiURL}/api/`,
});

export { instance };
