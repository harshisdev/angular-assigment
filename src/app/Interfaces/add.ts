export interface Add {
  name: string | undefined;
  image: string | undefined;
}

export interface deletecategories {
  id: string | undefined;
}
export interface UpdateCategories {
  id: string | undefined;
  name: string | undefined;
}

//////////////////////////////////////////////////////////
export interface updateProduct {
  title?: string;
  description?: string;
  price?: number;
  images?: [string];
  productId?: string;
}
export type cartlist = [
  {
    productId?: string | undefined;
    quantity?: number | undefined;
    title?: string | undefined;
    price?: number | undefined;
  }
];
