export type TLoginUser = {
  email: string;
  password: string;
};

export type TDecodedUser = {
  email: string;
  role: string;
  name: string;
  imgUrl: string;
  iat: number;
  exp: number;
};
