export type TUser = {
  name: string;
  email: string;
  password: string;
  photoUrl: string;
  role: 'admin' | 'user';
  isDeleted: boolean;
};
