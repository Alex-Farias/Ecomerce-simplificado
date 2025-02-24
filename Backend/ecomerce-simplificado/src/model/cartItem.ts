import { Cart } from "./cart";
import { Product } from "./product";

export interface CartItem{
    id: number;
    cart: Cart;
    product: Product;
    productQuantity: number;
    selected: boolean;
}