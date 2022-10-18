import { Button } from "@mui/material";
import Advertisement from "../types/Advertisement";

interface AdvertisementCardProps {
    advertisement: Advertisement;
    onClickFunction: () => void;
}
function AdvertisementCard(props: AdvertisementCardProps) {
    return (
        <div className="flex flex-row h-25 items-center mt-3 mb-3">
            <img
                src={props.advertisement.image}
                alt={props.advertisement.name}
                className="max-h-28 max-w-28 object-contain"
            />
            <div className="pt-5 pb-5 h-36 ml-5 flex flex-col justify-evenly items-start">
                <div className="text-lg font-normal">
                    {props.advertisement.name}
                </div>
                <div className="text-sm">{props.advertisement.description}</div>
                <div className="font-light">
                    {`${props.advertisement.price} €/kg`}
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={props.onClickFunction}
                >
                    Comprar
                </Button>
            </div>
        </div>
    );
}
export default AdvertisementCard;
