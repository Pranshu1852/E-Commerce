import type { FilterQueryType } from '../types/ProductTypes';

export function filterEndPoint(filterQuery: FilterQueryType) {
  const params = new URLSearchParams();

  if (filterQuery.search) {
    params.append('filters[$or][0][title][$containsi]', filterQuery.search);
    params.append(
      'filters[$or][1][description][$containsi]',
      filterQuery.search
    );
  }

  if (filterQuery.category) {
    params.append('filters[category][name][$eqi]', filterQuery.category);
  }

  if (filterQuery.brand) {
    params.append('filters[brand][name][$eqi]', filterQuery.brand);
  }

  if (filterQuery.minPrice) {
    params.append('filters[price][$gte]', filterQuery.minPrice);
  }

  if (filterQuery.maxPrice) {
    params.append('filters[price][$lte]', filterQuery.maxPrice);
  }

  if (filterQuery.sort) {
    params.append('sort', filterQuery.sort);
  }

  params.append('populate', '*');

  return params.toString();
}
