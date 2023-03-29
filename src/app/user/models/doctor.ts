export interface Doctor {
  id?: number;
  name: string;
  category: string[];
  isPinned: boolean;
  rating: number;
  ID?: number;
  email?: string;
  booked?: number;
  view: number;
  image: string;
}
