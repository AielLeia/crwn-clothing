export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: Product[];
};

export type CategoryMap = {
  [key: string]: Product[];
};
