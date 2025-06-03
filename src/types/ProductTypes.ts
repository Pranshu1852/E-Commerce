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
