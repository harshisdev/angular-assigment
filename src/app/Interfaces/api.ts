export interface ApiResponse {
  categories: [
    {
      id: string;
      name: string;
      _typename: string;
    }
  ];
}
export interface Category {
  id: string;
  name: string;
  _typename: string;
}

export interface Product {
  description: string;
  _typename: string;
  id: string;
  title: string;

  price: number;
}
export interface ApiProductResponse {
  products: [
    {
      _typename: string;
      id: string;
      title: string;
      description: string;
      price: number;
    }
  ];
}

export interface NewProduct {
  title: string | undefined;
  description: string | undefined;
  images: [string] | undefined;
  price: number | undefined;
  categoryId: number | undefined;
}
