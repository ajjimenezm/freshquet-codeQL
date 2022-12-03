import Advertisement from "../types/Advertisement";
import { useEffect, useState } from "react";
import AdvertisementManagement from "../libs/AdvertisementManagement";
import { Skeleton } from "@mui/material";

interface AdvertisementCardProps {
    advertisement: Advertisement;
    onClick: () => void;
}

function AdvertisementCard(props: AdvertisementCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        AdvertisementManagement.GetImageAdvertisment(
            props.advertisement._id
        ).then((res) => {
            setImage(res);
            setImageLoaded(true);
        });
    });

    return (
        <div
            className="h-25 mt-1 mb-1 flex flex-row items-center"
            onClick={props.onClick}
        >
            {imageLoaded ? (
                <img
                    src={image}
                    alt={props.advertisement.name}
                    className="aspect-square w-28 rounded-lg border-2 object-cover object-center"
                />
            ) : (
                <div className="aspect-square w-28 rounded-lg object-cover object-center">
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        sx={{ width: 112, height: 112 }}
                    />
                </div>
            )}

            <div className="ml-3 flex h-36 flex-col items-start justify-evenly pt-3 pb-3">
                <div className="text-lg font-normal">
                    {props.advertisement.name}
                </div>
                <div className="text-sm">{props.advertisement.description}</div>
                <div className="font-light">
                    {`${props.advertisement.pricePerKilogram} €/kg`}
                </div>
            </div>
        </div>
    );
}
export default AdvertisementCard;
