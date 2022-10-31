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
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [advertisementsToShow, setAdvertisementsToShow] =
        React.useState<JSX.Element[]>();
    const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
        []
    );
    const [minimumTimeElapsed, setMinimumTimeElapsed] = React.useState(false);
    const waitingTimeSkeletonLoader = 500;

    const [userRole, setUserRole] = React.useState<string>();

    const navigate = useNavigate();

    React.useEffect(() => {
        const user = localStorage.getItem("userToken");
        if (!user) {
            navigate("/login");
        }
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setMinimumTimeElapsed(true);
        }, waitingTimeSkeletonLoader);

        axios
            .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "userToken"
                    )}`,
                },
            })
            .then((res) => {
                setUserRole(res.data.userRole);
            });

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
                //llevar a página de error
            });
    }, []);

    React.useEffect(() => {
        setAdvertisementsToShow(
            advertisements.map((ad) => {
                return <AdvertisementCard key={ad._id} advertisement={ad} />;
            })
        );
    }, [dataLoaded]);

    return (
        <div>
            <Heading text="Lo más fresco para tí" />
            <SubHeading text="Creemos que estos productos pueden interesarte" />
            {userRole == "seller" ? <AddProduct /> : <></>}

            <div className="mb-16 ml-5 mr-5 divide-y-2">
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
                onClick={() => navigate("/newproduct")}
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export default Home;
