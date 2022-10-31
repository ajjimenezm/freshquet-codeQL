import { Avatar, Divider, Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import SubHeading from "../SubHeading";
import Advertisement from "../../types/Advertisement";
import AdvertisementCard from "../AdvertisementCard";
import AdvertisementCardSkeleton from "../AdvertisementCardSkeleton";

interface ISellerData {
    name: string;
    username: string;
    phone_number: string;
    email: string;
    biography: string;
    direction: string;
}

function SellerPage() {
    const { id } = useParams<{ id: string }>();

    const [seller, setSeller] = React.useState<ISellerData>({
        name: "",
        username: "",
        phone_number: "",
        email: "",
        biography: "",
        direction: "",
    });
    const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
        []
    );
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [advertisementsToShow, setAdvertisementsToShow] =
        React.useState<JSX.Element[]>();
    const [minimumTimeElapsed, setMinimumTimeElapsed] = React.useState(false);
    const waitingTimeSkeletonLoader = 500;

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: "#63d4a1",
                width: 100,
                height: 100,
                fontSize: 45,
                fontWeight: "bold",
            },
            children: `${name.split(" ")[0][0]}`,
        };
    };

    const fetchSellerData = async () => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${id}/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "userToken"
                        )}`,
                    },
                }
            )
            .then((res) => {
                setSeller({
                    name: res.data.name,
                    username: res.data.username,
                    phone_number: res.data.phone_number,
                    email: res.data.email,
                    direction: res.data.direction,
                    biography: res.data.biography,
                });
            });
    };

    const fetchSellerProductsData = async () => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "userToken"
                        )}`,
                    },
                }
            )
            .then((res) => {
                setAdvertisements(res.data);
                setDataLoaded(true);
            });
    };

    fetchSellerData();
    fetchSellerProductsData();

    React.useEffect(() => {
        setTimeout(() => {
            setMinimumTimeElapsed(true);
        }, waitingTimeSkeletonLoader);
    }, []);

    React.useEffect(() => {
        setAdvertisementsToShow(
            advertisements.map((ad) => {
                return (
                    <>
                        <AdvertisementCard key={ad._id} advertisement={ad} />
                        <Divider
                            key={ad._id}
                            className=""
                            orientation="horizontal"
                        />
                    </>
                );
            })
        );
    }, [dataLoaded]);

    return (
        <div className="m-4 space-y-4">
            <div className="flex space-x-4 py-4">
                <Avatar {...stringAvatar(seller.name)} />
                <div className=" flex-col space-y-4">
                    <h1 className="text-4xl">{seller.name}</h1>
                    <p className=" text-lg opacity-50">{seller.username}</p>
                </div>
            </div>
            <p className=" text-lg">{seller.biography}</p>
            <Divider />
            <div className="flex space-x-2 text-sm">
                <LocationOnIcon fontSize="small" />
                <p>{seller.direction}</p>
            </div>
            <div className="flex space-x-2 text-sm">
                <CallIcon fontSize="small" />
                <p>{seller.phone_number}</p>
            </div>
            <div className="flex space-x-2 text-sm">
                <EmailIcon fontSize="small" />
                <p>{seller.email}</p>
            </div>
            <div className="justify-start">
                <p>Puntuación: </p>
                <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    precision={0.5}
                    readOnly
                />
            </div>
            <Divider />
            <div>
                <SubHeading text={"Productos vendidos por " + seller.name} />
                {dataLoaded ? (
                    advertisementsToShow
                ) : minimumTimeElapsed ? (
                    <>
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                        <AdvertisementCardSkeleton />
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default SellerPage;
