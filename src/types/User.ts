export type User = {
  _id: string;
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  profile_picture: string;
  direction: string;
  biography: string;
  latitude: number;
  longitude: number;
  userType: string;
  adsInSeeLater: string[];
};

export type UserEdit = {
  _id?: string;
  name?: string;
  username?: string;
  password?: string;
  phoneNumber?: string;
  email?: string;
  profile_picture?: string;
  direction?: string;
  biography?: string;
  latitude?: number;
  longitude?: number;
  userType?: string;
  adsInSeeLater?: string[];
};
