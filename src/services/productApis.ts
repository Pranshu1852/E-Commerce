import { instance } from './axiosInstance';

export async function getAllProducts() {
  try {
    const response = await instance.get('/products?populate=*');

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
