import { Produto } from "src/entity/produto.entity";
import { Order } from "../order";

export interface OrderItem{
  id: number;
  oder: Order;
  product: Produto;
  productQuantity: number;
  isActive: boolean;
}