import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import UserHelper from "../../libs/UserHelper";
import { Review } from "../../types/Compra";
import ReviewCard from "../shared/ReviewCard";

interface SellerReviewsProps {
  seller_id: string;
  avgRating?: number;
}

const SellerReviews = (props: SellerReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsToShow, setReviewsToShow] = useState<JSX.Element[]>();

  useEffect(() => {
    UserHelper.GetReviews(props.seller_id).then((res) => {
      setReviews(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    const aux: JSX.Element[] = [];
    reviews.map((review) => {
      aux.push(
        <ReviewCard
          key={
            review.buyer_id + review.review + Math.floor(Math.random() * 10001)
          }
          buyerId={review.buyer_id}
          comment={review.review_text}
          score={review.review}
        />
      );
    });
    setReviewsToShow(aux);
  }, [reviews]);

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-3 flex flex-row border-b-[1px] border-solid border-black">
        <div className="font-outfit text-[26px] font-medium">
          {props.avgRating === -1 ? 0 : props.avgRating}/5
        </div>
        <div className="ml-4 align-bottom font-outfit text-[14px] font-medium">
          ({reviews.length} opiniones)
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-5">
        {reviewsToShow && reviewsToShow.length > 0 ? (
          reviewsToShow
        ) : (
          <div className="mt-1 text-center">
            <Skeleton animation="wave" width={265} height={150} />
            <Skeleton animation="wave" width={265} height={150} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerReviews;
