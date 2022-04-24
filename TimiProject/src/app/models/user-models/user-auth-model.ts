export interface UserAuthModel {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  userName: string;
  phoneNumber?: string;
}
