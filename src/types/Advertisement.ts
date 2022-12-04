import { Category } from "./Category";

type Advertisement = {
    _id: string;
    pictures: string[];
    name: string;
    pricePerKilogram: number;
    description: string;
    averageReviewScore: number;
    category: Category;
    sellerId: {
        _id: string;
        name: string;
        username: string;
    };
};

export default Advertisement;
