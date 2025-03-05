import { User } from "src/model/user/user";
import { ProductCategory } from "../category/productCategory";

export interface ProductInterface{
  id: number;
  category: number;
  user: number;
  title: string;
  description: any;
  unity: string;
  price: number;
  isActive: boolean;
}