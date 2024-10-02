import { ProductInterface } from "./Products";

export interface OrdersItems {
  id: string;
  quantity: number;
  added_at: string;
  product: ProductInterface;
}
