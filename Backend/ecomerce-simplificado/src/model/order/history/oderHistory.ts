import { User } from "src/model/user/user";
import { Product } from "../../product/product";
import { OrderItem } from "../item/orderItem";
import { Order } from "../order";

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