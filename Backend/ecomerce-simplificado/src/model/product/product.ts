import { User } from "../user/user";
import { ProductCategory } from "./category/productCategory";

export interface Product{
  id: string;
  category: ProductCategory;
  user: User;
  title: string;
  description: any;
  uinity: string;
  price: number;
}