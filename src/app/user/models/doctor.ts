import { Category } from "src/app/categories/models/category";
import { User } from "./user";

export interface Doctor extends User{
  isPinned: boolean;
  rating: number;
  views: number;
  category: Category;
}
