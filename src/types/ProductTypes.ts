export interface categoryType {
  name: string;
}

export interface brandType {
  name: string;
}

export interface ProductType {
  documentId: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: {
    url: string;
  };
  brand: brandType;
  category: categoryType;
}

export interface FilterQueryType {
  search: string;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

export interface filterSelectOptionType {
  label: string;
  value: string;
}
