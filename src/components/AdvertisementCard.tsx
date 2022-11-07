import { Button } from "@mui/material";
import Advertisement from "../types/Advertisement";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { toNamespacedPath } from "path";

interface AdvertisementCardProps {
  advertisement: Advertisement;
}

function AdvertisementCard(props: AdvertisementCardProps) {
  const navigate = useNavigate();
  const [imageName, setImageName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const navigateFunction = (id: string) => {
    navigate(`/products/detail/${id}`);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${props.advertisement._id}/images`
      )
      .then((res) => {
        if (res.data.length > 0) setImageName(res.data[0]);
      });
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${props.advertisement._id}/images/${imageName}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        setImage(
          `data:;base64,${Buffer.from(res.data, "binary").toString("base64")}`
        );
      });
  }, [imageName]);

  return (
    <div
      className="h-25 mt-1 mb-1 flex flex-row items-center"
      onClick={navigateFunction.bind(null, props.advertisement._id)}
    >
      <img
        src={image}
        alt={props.advertisement.name}
        className="aspect-square w-28 rounded-lg border-2 object-cover object-center"
      />
      <div className="ml-3 flex h-36 flex-col items-start justify-evenly pt-3 pb-3">
        <div className="text-lg font-normal">{props.advertisement.name}</div>
        <div className="text-sm">{props.advertisement.description}</div>
        <div className="font-light">
          {`${props.advertisement.pricePerKilogram} €/kg`}
        </div>
      </div>
    </div>
  );
}
export default AdvertisementCard;
