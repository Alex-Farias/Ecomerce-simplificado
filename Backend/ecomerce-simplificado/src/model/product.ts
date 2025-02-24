import { ProductCategory } from "./productCategory";
import { User } from "./user";

export interface Product{
  id: string;
  category: ProductCategory;
  user: User;
  title: string;
  description: any;
  uinity: string;
  price: number;
}