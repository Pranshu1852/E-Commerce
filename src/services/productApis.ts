import type { FilterQueryType, ProductType } from '../types/ProductTypes';
import { filterEndPoint } from '../utils/endPointHandler';

import { instance } from './axiosInstance';

export async function getProducts(filterQuery: FilterQueryType) {
  try {
    const endPoint = filterEndPoint(filterQuery);
    const response = await instance.get(`/products?${endPoint}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductDetail(
  id: string
): Promise<ProductType | undefined> {
  try {
    const response = await instance.get(`/products/${id}?populate=*`);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategories() {
  try {
    const response = await instance.get(`/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllBrands() {
  try {
    const response = await instance.get(`/brands`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
