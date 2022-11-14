import { useEffect, useState } from "react";
import axios from "axios";
import Advertisement from "../../types/Advertisement";
import AdvertisementManagement from "../../libs/AdvertisementManagement";

interface advHistoryCardProps {
  adv_id: string;
  quantity: number;
  is_ended: boolean;
}

function AdvHistoryCard(props: advHistoryCardProps) {
  const [advertisement, setAdv] = useState<Advertisement>();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${props.adv_id}`
      )
      .then((res) => {
        console.log("RESPUESTA ADVERTISEMENT");
        console.log(res);
        setAdv(res.data);
      });
  });

  useEffect(() => {
    AdvertisementManagement.GetImageAdvertisment(props.adv_id).then((res) => {
      setImage(res);
    });
  });

  return (
    <div className="h-25 mt-1 mb-1 flex flex-row items-center">
      <img
        src={image}
        alt={advertisement?.name}
        className="aspect-square w-28 rounded-lg border-2 object-cover object-center"
      />
      <div className="ml-3 flex h-36 flex-col items-start justify-evenly pt-3 pb-3">
        <div className="text-lg font-normal">{advertisement?.name}</div>
        <div className="text-sm">Vendido por:</div>
        <div>{advertisement?.sellerId.name}</div>
        <div className="font-light">
          {`${advertisement?.pricePerKilogram} €/kg`} · {props.quantity} kg
        </div>
        <div>
          {props.is_ended ? <div>Finalizada</div> : <div>En tramite</div>}
        </div>
      </div>
    </div>
  );
}
export default AdvHistoryCard;
