import { User } from './User';

export type Compra = {
  adv_id: any;

  seller_id: any;

  buyer_id: any;

  quantity: number;

  is_ended: boolean;

  confirmation_code: string;

  price: number;

  review: number;

  review_text: string;
};

export type Review = { buyer: User; score: number; comment: string };
