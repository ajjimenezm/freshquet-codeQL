import Advertisement from "../types/Advertisement";
import AdvertisementCard from "./AdvertisementCard";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import axios from "axios";
import React from "react";
import AdvertisementCardSkeleton from "./AdvertisementCardSkeleton";
import AddProduct from "./advertisements/AddProduct";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

const Home = () => {
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [advertisementsToShow, setAdvertisementsToShow] =
        React.useState<JSX.Element[]>();
    const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
        []
    );
    const [minimumTimeElapsed, setMinimumTimeElapsed] = React.useState(false);
    const waitingTimeSkeletonLoader = 500;

    React.useEffect(() => {
        setTimeout(() => {
            setMinimumTimeElapsed(true);
        }, waitingTimeSkeletonLoader);
        getAdvertisements();
    }, []);

    React.useEffect(() => {
        setAdvertisementsToShow(
            advertisements.map((ad) => {
                return (
                    <AdvertisementCard
                        key={ad._id}
                        advertisement={ad}
                        onClickFunction={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                );
            })
        );
    }, [dataLoaded]);

    const getAdvertisements = () => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all`
            )
            .then((response) => {
                if (response.status === 200) {
                    setAdvertisements(response.data);
                    setDataLoaded(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Heading text="Lo más fresco para tí" />
            <SubHeading text="Creemos que estos productos pueden interesarte" />
            <AddProduct />

            <div className="ml-5 mr-5">
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
            <Fab
                color="primary"
                aria-label="add product"
                sx={{
                    position: "fixed",
                    bottom: 80,
                    right: 20,
                }}
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export default Home;
