import type {
  brandType,
  categoryType,
  filterSelectOptionType,
} from '../types/ProductTypes';

export function mergeFilterSelectArray(
  initialArray: Array<filterSelectOptionType>,
  fetchArray: Array<categoryType | brandType> | null
): Array<filterSelectOptionType> {
  if (!fetchArray) {
    return initialArray;
  }

  const newSelectArray = fetchArray.map((val) => {
    return {
      label: val.name,
      value: val.name,
    };
  });

  const selectArray = [...initialArray, ...newSelectArray];
  return selectArray;
}
