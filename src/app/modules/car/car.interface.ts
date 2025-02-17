export type TCar = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  quantity: number;
  imgUrl: [string];
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
};
