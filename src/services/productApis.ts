import type { ProductSearchFilterType } from '../types/ProductTypes';

import { instance } from './axiosInstance';

export async function getProducts(filterQuery: ProductSearchFilterType) {
  try {
    const response = await instance.get(
      `/products?filters[$or][0][title][$containsi]=${filterQuery.search || ''}&filters[$or][1][description][$containsi]=${filterQuery.search || ''}&populate=*`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductDetail(id: string) {
  try {
    const response = await instance.get(`/products/${id}?populate=*`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
