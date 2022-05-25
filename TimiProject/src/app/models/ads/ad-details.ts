import { Timestamp } from "firebase/firestore";

export interface AdDetails {
  uid: string,
  userRef:any,
  description: string,
  competitive: boolean,
  platform: string,
  country: string,
  city: string,
  age: Timestamp
}
