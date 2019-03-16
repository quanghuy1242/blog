import { Timestamp } from "@firebase/firestore-types";

export class Comment {
  name: string;
  date: Timestamp | Date;
  content: string;
}