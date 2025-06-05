import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useQuery } from '@tanstack/react-query';
import { type ChangeEvent } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

import filterIcon from '../../../assets/filter.svg';
import useToggle from '../../../hooks/useToggle';
import { getAllBrands, getAllCategories } from '../../../services/productApis';
import { mergeFilterSelectArray } from '../../../utils/filterUtils';

import FilterSelectField from './FilterSelectField';

function FilterBar() {
  const { isOpen, toggle } = useToggle();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showBoundary } = useErrorBoundary();
  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  const {
    data: brands,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: getAllBrands,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const filterQuery = event.target.value;

    searchParams.set(event.target.name, filterQuery);
    setSearchParams(searchParams);
    if (filterQuery === 'none' || filterQuery === 'all' || filterQuery === '') {
      if (searchParams.has(event.target.name)) {
        searchParams.delete(event.target.name);
        setSearchParams(searchParams);
      }
    }
  }

  if (categoryError || brandsError) {
    showBoundary('Something Went Wrong.');
  }

  return (
    <div className='flex flex-col gap-5 p-5 shadow-[0px_0px_7px_-1px_rgba(0,0,0,0.2)] rounded-md'>
      <button
        onClick={toggle}
        className='flex flex-row justify-between items-center gap-2'
      >
        <div className='flex flex-row gap-2'>
          <img className='w-7' src={filterIcon} alt='filter icon' />
          <h2>Filter</h2>
        </div>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>
      {isOpen && (
        <div className='flex flex-col md:flex-row gap-5 w-full'>
          <FilterSelectField
            label='Category'
            name='category'
            value={searchParams.get('category') || 'all'}
            options={mergeFilterSelectArray(
              [
                {
                  label: 'All Categories',
                  value: 'all',
                },
              ],
              categories
            )}
            onChange={handleChange}
            isLoading={categoryLoading}
          />
          <FilterSelectField
            label='Brand'
            name='brand'
            value={searchParams.get('brand') || 'all'}
            options={mergeFilterSelectArray(
              [
                {
                  label: 'All Brands',
                  value: 'all',
                },
              ],
              brands
            )}
            onChange={handleChange}
            isLoading={brandsLoading}
          />
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor=''>Price</label>
            <div className='flex flex-row gap-2 h-full'>
              <input
                onChange={handleChange}
                value={searchParams.get('minPrice') || ''}
                className='border border-black rounded-[5px] p-2 w-full'
                type='number'
                placeholder='Min Price'
                name='minPrice'
              />
              <input
                onChange={handleChange}
                value={searchParams.get('maxPrice') || ''}
                className='border border-black rounded-[5px] p-2 w-full'
                type='number'
                placeholder='Max Price'
                name='maxPrice'
              />
            </div>
          </div>
          <FilterSelectField
            label='Sort By'
            value={searchParams.get('sort') || 'none'}
            name='sort'
            options={[
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Price: Low to High',
                value: 'price:asc',
              },
              {
                label: 'Price: High to Low',
                value: 'price:desc',
              },
              {
                label: 'Rating',
                value: 'rating:desc',
              },
            ]}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default FilterBar;
