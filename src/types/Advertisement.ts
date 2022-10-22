import { Category } from './Category';

type Advertisement = {
  _id: string;
  image: string;
  name: string;
  pricePerKilogram: number;
  description: string;
  averageReviewScore: number;
  category: Category;
  sellerId: {
    id: string;
    name: string;
  };
};

export default Advertisement;
