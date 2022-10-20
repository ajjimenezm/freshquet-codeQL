import { Button } from "@mui/material";
import { userInfo } from "os";
import { useEffect } from "react";
import Advertisement from "../types/Advertisement";
import EditProduct from "./Products_To_Sell/EditProduct";
import {useNavigate } from 'react-router-dom';

interface AdvertisementCardProps {
    advertisement: Advertisement;
    onClickFunction: () => void;

}
function AdvertisementCard(props: AdvertisementCardProps) {
    const navigate = useNavigate();

    const navigateFunction = (id: string) => {
        navigate(`/products/detail/${id}`);
    }

    return (
        <div className="h-25 mt-3 mb-3 flex flex-row items-center">
            <img
                src="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg"
                alt={props.advertisement.name}
                className="max-w-28 max-h-28 object-contain"
            />
            <div className="ml-5 flex h-36 flex-col items-start justify-evenly pt-5 pb-5">
                <div className="text-lg font-normal">
                    {props.advertisement.name}
                </div>
                <div className="text-sm">{props.advertisement.description}</div>
                <div className="font-light">
                    {`${props.advertisement.pricePerKilogram} €/kg`}
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={props.onClickFunction}
                >
                    Comprar
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={navigateFunction.bind(null, props.advertisement._id)}
                >
                    Ver Más
                </Button>
            </div>
        </div>
    );
}
export default AdvertisementCard;
