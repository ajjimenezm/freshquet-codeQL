import { Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import AdvertisementManagement from "../../../libs/AdvertisementManagement";
import Advertisement from "../../../types/Advertisement";

interface NearbyAdCardProps {
    ad_id: string;
    onClick: () => void;
}

const AdCards = (props: NearbyAdCardProps) => {
    const [advertisement, setAd] = useState<Advertisement>();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image, setImage] = useState<string>("");
    const [seller, setSeller] = useState<string>("");

    useEffect(() => {
        AdvertisementManagement.GetAdvertisementById(props.ad_id).then(
            (res) => {
                setAd(res);
            }
        );
    }, []);

    useEffect(() => {
        if (advertisement?._id) {
            AdvertisementManagement.GetImageAdvertisment(
                advertisement?._id
            ).then((res) => {
                setImage(res);
                setImageLoaded(true);
            });
        }

        if (advertisement?.sellerId) {
            AdvertisementManagement.GetSellerName(
                advertisement?.sellerId._id
            ).then((res) => {
                setSeller(res);
            });
        }
    }, [advertisement]);

    return (
        <>
            {advertisement && (
                <div
                    className="text-semibold flex h-[125px] flex-shrink-0 overflow-hidden rounded-xl border-[1px] border-black bg-[white]"
                    onClick={props.onClick}
                >
                    <div className=" w-7/12">
                        <div className="flex flex-col items-start space-y-2 border-b-[1px] border-dashed border-black pl-4 pt-2 pb-4 text-left">
                            <p className=" text-[16px] font-medium">
                                {advertisement?.name}
                            </p>
                            <p className=" text-[12px] font-medium">
                                {advertisement?.pricePerKilogram}€/Kg
                            </p>
                        </div>
                        <div className=" pl-4 pt-1">
                            <p className=" text-[12px] font-medium">{seller}</p>
                        </div>
                    </div>
                    <div className="w-5/12 border-l-[1px] border-black align-middle">
                        {imageLoaded ? (
                            <img
                                src={image}
                                alt={advertisement?.name}
                                className="h-full w-full  object-cover"
                            />
                        ) : (
                            <div className="h-full w-full object-cover">
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{ width: "100%", height: "100%" }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
    /*  return (
    <div
      className="text-semibold flex h-[125px] flex-shrink-0 overflow-hidden rounded-xl border-[1px] border-black bg-[white]"
      //onClick={navigateFunction.bind(null, advertisement?._id)}
      onClick={navigateFunction}
    >
      <div className=" w-7/12">
        <div className="flex flex-col items-start space-y-2 border-b-[1px] border-dashed border-black pl-4 pt-2 pb-4 text-left">
          <p className=" text-[16px] font-medium">{advertisement?.name}</p>
          <p className=" text-[12px] font-medium">
            {advertisement?.pricePerKilogram}€/Kg
          </p>
        </div>
        <div className=" pl-4 pt-1">
          <p className=" text-[12px] font-medium">{seller}</p>
        </div>
      </div>
      <div className="w-5/12 border-l-[1px] border-black align-middle">
        {imageLoaded ? (
          <img
            src={image}
            alt={advertisement?.name}
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
  );*/
};

export default AdCards;
