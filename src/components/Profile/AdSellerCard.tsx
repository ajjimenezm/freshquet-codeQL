import { Skeleton } from "@mui/material";
import { string } from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import Advertisement from "../../types/Advertisement";
import { ReactComponent as FavouriteIcon } from "../../assets/icons/FavouriteIcon.svg";

interface NearbyAdCardProps {
  advertisement: Advertisement;
}

const AdSellerCard = (props: NearbyAdCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<string>("");
  const [seller, setSeller] = useState<string>("");

  const navigateFunction = (id: string) => {
    navigate(`/products/edit/${props.advertisement._id}`);
  };

  useEffect(() => {
    AdvertisementManagement.GetImageAdvertisment(props.advertisement._id).then(
      (res) => {
        setImage(res);
        setImageLoaded(true);
      }
    );

    AdvertisementManagement.GetSellerName(
      props.advertisement.sellerId._id
    ).then((res) => {
      setSeller(res);
    });
  }, []);

  return (
    <div
      className="text-semibold flex h-[145px] w-[145px] flex-shrink-0 overflow-hidden rounded-xl border-[1px] border-black bg-[white]"
      onClick={navigateFunction.bind(null, props.advertisement._id)}
    >
      <div className="w-full align-middle">
        {imageLoaded ? (
          <img
            src={image}
            alt={props.advertisement.name}
            className="h-full w-full  object-cover"
          />
        ) : (
          <div className="h-full w-full object-cover">
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ width: "100%", height: "100%", bgcolor: "#F4511D" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSellerCard;
