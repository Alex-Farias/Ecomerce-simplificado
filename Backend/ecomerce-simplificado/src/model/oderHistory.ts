import { Order } from "./order";
import { OrderItem } from "./orderItem";
import { Product } from "./product";
import { User } from "./user";

export interface OrderHistory{
      id: number;
      orderItemID: OrderItem;
      order: Order;
      product: Product;
      user: User;
      productQuantity: number;
      finalPrice: number;
      isActive: boolean;
      dateAlteration: Date;
}