import { Skeleton } from "@mui/material";
import { string } from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import Advertisement from "../../types/Advertisement";

interface NearbyAdCardProps {
  advertisement: any;
  onClick: () => void;
}

const NearbyAdCard = (props: NearbyAdCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [seller, setSeller] = useState<string>("");

  const navigateFunction = (id: string) => {
    props.onClick();
  };

  useEffect(() => {
    AdvertisementManagement.GetImageAdvertisment(props.advertisement._id).then(
      (res) => {
        setImage(res);
        setImageLoaded(true);
      }
    );

    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLocs = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      AdvertisementManagement.GetDistanceFormSeller(
        props.advertisement.sellerId,
        userLocs.latitude,
        userLocs.longitude
      ).then((res) => {
        const num = Number.parseFloat(res);
        setDistance(res);
      });
    });

    AdvertisementManagement.GetSellerName(
      props.advertisement.sellerId._id
    ).then((res) => {
      setSeller(res);
    });
  }, []);

  return (
    <div
      className="text-semibold flex h-[125px] flex-shrink-0 overflow-hidden rounded-xl border-[1px] border-black bg-[white]"
      onClick={navigateFunction.bind(null, props.advertisement._id)}
    >
      <div className=" w-7/12">
        <div className="flex flex-col items-start space-y-2 border-b-[1px] border-dashed border-black pl-4 pt-2 pb-4 text-left">
          <p className=" text-[16px] font-medium">
            {props.advertisement.name.length < 15
              ? props.advertisement.name
              : props.advertisement.name.substring(0, 12) + "..."}
          </p>
          <p className=" text-[12px] font-medium">
            {props.advertisement.pricePerKilogram}€/Kg
          </p>
        </div>
        <div className=" pl-4 pt-1">
          <p className=" text-[12px] font-medium">{seller}</p>
          <p className=" text-[10px]">A {distance} Km de ti</p>
        </div>
      </div>
      <div className="w-5/12 border-l-[1px] border-black align-middle">
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
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyAdCard;
