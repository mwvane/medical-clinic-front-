import { Book } from "src/app/models/book";

export interface Day {
  date: Date;
  book?: Book | null;
  isCurrentUserBook?: boolean;
  isRestDay?: boolean;
}
