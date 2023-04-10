import { NavbarItem } from "src/app/header/models/navbar-item";

export interface FooterItem {
  id: number;
  caption: string
  items?: NavbarItem[]
}
