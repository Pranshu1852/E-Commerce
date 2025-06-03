export interface ProductType {
  documentId: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: {
    url: string;
  };
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
}

export interface ProductSearchFilterType {
  search: string;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
}
