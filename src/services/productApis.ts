import type {
  brandType,
  categoryType,
  FilterQueryType,
  ProductType,
} from '../types/ProductTypes';
import { filterEndPoint } from '../utils/endPointHandler';

import { instance } from './axiosInstance';

export async function getProducts(
  filterQuery: FilterQueryType
): Promise<Array<ProductType> | undefined> {
  try {
    const endPoint = filterEndPoint(filterQuery);
    const response = await instance.get(`/products?${endPoint}`);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
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
    throw new Error('Failed to fetch data');
  }
}

export async function getAllCategories(): Promise<
  Array<categoryType> | undefined
> {
  try {
    const response = await instance.get(`/categories`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
}

export async function getAllBrands(): Promise<Array<brandType> | undefined> {
  try {
    const response = await instance.get(`/brands`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
}
