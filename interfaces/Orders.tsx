import { OrdersItems } from "./OrdersItems";
import { User } from "./Users";

export interface Orders {
  id: string;
  status: string;
  receiptUrl: string;
  paymentId: string;
  tipo: string;
  pais: string;
  municipio: string;
  estado: string;
  calle: string;
  noExterior: string;
  noInterior: string;
  colonia: string;
  cp: number;
  createdAt: string;
  order_items: OrdersItems[];
  user: User;
}
