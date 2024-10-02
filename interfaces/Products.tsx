export interface ProductInterface {
  price: number;
  image: { url: string }[];
  color: string[];
  name: string;
  description: string;
  discount: number;
  material: string[];
  size: string[];
  stock: number;
  sales: number;
  isActive: boolean;
}
