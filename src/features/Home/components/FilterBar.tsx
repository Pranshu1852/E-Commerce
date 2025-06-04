import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import filterIcon from '../../../assets/filter.svg';
import useToggle from '../../../hooks/useToggle';

import FilterSelectField from './FilterSelectField';

function FilterBar() {
  const { isOpen, toggle } = useToggle();
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div className='flex flex-col gap-5 p-5 shadow-md rounded-md'>
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
            options={[
              {
                label: 'All Categories',
                value: 'all',
              },
            ]}
            onChange={handleChange}
          />
          <FilterSelectField
            label='Brand'
            name='brand'
            value={searchParams.get('brand') || 'all'}
            options={[
              {
                label: 'All Brands',
                value: 'all',
              },
            ]}
            onChange={handleChange}
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
                value: 'price:desc',
              },
              {
                label: 'Price: High to Low',
                value: 'price:asc',
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
