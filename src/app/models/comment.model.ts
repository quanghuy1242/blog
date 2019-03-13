import { Timestamp } from "@firebase/firestore-types";

export class Comment {
  name: string;
  date: Timestamp;
  comment: string;
}