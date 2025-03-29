export interface User {
  isDeleted: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  token: string;
  picture?: string;
}
