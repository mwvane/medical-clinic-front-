import { Category } from "src/app/categories/models/category";
import { User } from "./user";
import { Pin } from "./pin";

export interface Doctor extends User{
  isPinned: boolean;
  pinDate?: Date;
  rating: number;
  views: number;
  category: Category;
  pin?: Pin
}
