import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import Advertisement from "../../types/Advertisement";

interface AdvertisementCardProps {
  advertisement: Advertisement;
  onClick: () => void;
}

const AdvertisementCardStandard = (props: AdvertisementCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [seller, setSeller] = useState<string>("");

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
        props.advertisement.sellerId._id,
        userLocs.latitude,
        userLocs.longitude
      ).then((res) => {
        setDistance(res.toString());
      });
    });
  }, []);

  return (
    <div
      className="text-semibold  flex h-[125px] flex-shrink-0 overflow-hidden rounded-xl border-[1px] border-black  text-black"
      onClick={props.onClick}
    >
      <div className="w-[150px]">
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
          <p className=" text-[12px] font-medium">
            {props.advertisement.sellerId.name}
          </p>
          <p className=" text-[10px]">A {distance} Km de ti</p>
        </div>
      </div>
      <div className="w-[125px] border-l-[1px] border-black align-middle">
        {imageLoaded ? (
          <img
            src={image}
            alt={props.advertisement.name}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="aspect-square h-full w-full">
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementCardStandard;
