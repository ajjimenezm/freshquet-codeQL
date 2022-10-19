import { Category } from "./Category";

type Advertisement = {
    _id: string;
    image: string;
    name: string;
    price: number;
    description: string;
    averageReviewScore: number;
    category: Category;
};

export default Advertisement;
