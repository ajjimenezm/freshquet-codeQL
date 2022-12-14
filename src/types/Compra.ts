import { User } from './User';

export type Compra = {
  _id: string;

  adv_id: any;

  seller_id: any;

  buyer_id: any;

  quantity: number;

  is_ended: boolean;

  confirmation_code: string;

  price: number;

  name: string;

  review: number;

  review_text: string;
};

export type Review = { buyer_id: string; review: number; review_text: string };
