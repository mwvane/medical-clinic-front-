import { User } from "./user";

export interface Doctor extends User{
  category: string[];
  isPinned: boolean;
  rating: number;
  views: number;
}
