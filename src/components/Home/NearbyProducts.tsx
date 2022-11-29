import React, { useEffect } from "react";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import LocationManagement from "../../libs/LocationManagement";
import Advertisement from "../../types/Advertisement";
import { ReactComponent as BackArrow } from "../../assets/icons/Flecha.svg";
import NearbyAdCard from "./NearbyAdCard";
import { useNavigate } from "react-router-dom";
import AdDetailBuyerList from "../advertisements/AdDetailBuyerList";

const NearbyProducts = () => {
    const navigate = useNavigate();
    const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
        []
    );
    const [advertisementsToShow, setAdvertisementsToShow] =
        React.useState<JSX.Element[]>();
    const [address, setAddress] = React.useState("");
    const [showProductDetail, setShowProductDetail] = React.useState(false);

    useEffect(() => {
        AdvertisementManagement.GetAllAdvertisements().then((res) => {
            setAdvertisements(res);
        });

        navigator.geolocation.getCurrentPosition(async (position) => {
            const userLocs = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            LocationManagement.GetAddressFromCoordinates(
                userLocs.latitude,
                userLocs.longitude
            ).then((res) => {
                setAddress(`${res[1]}, ${res[2]}`);
            });
        });
    }, []);

    React.useEffect(() => {
        console.log(advertisements);
        setAdvertisementsToShow(
            advertisements.map((ad) => {
                return (
                    <NearbyAdCard
                        key={ad._id}
                        advertisement={ad}
                        removeAd={removeAd}
                        onClick={() => {
                            setShowProductDetail(true);
                        }}
                    />
                );
            })
        );
    }, [advertisements]);

    const removeAd = (ad: Advertisement) => {
        const index = advertisements.indexOf(ad);
        if (index > -1) {
            const array = [...advertisements];
            array.splice(index, 1);
            setAdvertisements(array);
        }
        console.log(advertisements);
    };

    return (
        <>
            {showProductDetail && (
                <AdDetailBuyerList
                    category="Productos cercanos"
                    products={advertisements}
                    onBack={() => {
                        setShowProductDetail(false);
                    }}
                />
            )}
            {!showProductDetail && (
                <div className=" absolute z-50 h-screen w-screen bg-[#F7DBAD]">
                    <div className="flex items-center space-x-8 p-8 align-middle">
                        {
                            <BackArrow
                                onClick={() => {
                                    navigate("/home");
                                }}
                            />
                        }
                        <p className=" font-[18px] font-space-mono font-bold">
                            {address}
                        </p>
                    </div>

                    <div className=" m-4 space-y-4">{advertisementsToShow}</div>
                </div>
            )}
        </>
    );
};

export default NearbyProducts;
