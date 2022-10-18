import TextField from "@mui/material/TextField";
import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import AdvertisementCard from "./AdvertisementCard";
import AdvertisementCardSkeleton from "./AdvertisementCardSkeleton";
import Heading from "./Heading";
import axios from "axios";
import Advertisement from "../types/Advertisement";

function Search() {
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [dataRequested, setDataRequested] = React.useState(false);
    const [minimumTimeElapsed, setMinimumTimeElapsed] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [advertisementsToShow, setAdvertisementsToShow] =
        React.useState<JSX.Element[]>();
    const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
        []
    );
    const waitingTimeSkeletonLoader = 500;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSearchParams({ search: event.target.value });
        getAds();
        setTimeout(() => {
            setMinimumTimeElapsed(true);
        }, waitingTimeSkeletonLoader);
    };
    React.useEffect(() => {
        if (searchParams.get("search")) {
            setSearch(searchParams.get("search") || "");
            getAds();
            setTimeout(() => {
                setMinimumTimeElapsed(true);
            }, waitingTimeSkeletonLoader);
        }
    }, []);

    React.useEffect(() => {
        const filteredAds = advertisements.filter((advertisement) => {
            if (
                advertisement.name
                    .toLowerCase()
                    .includes(searchParams.get("search")?.toLowerCase() || "")
            ) {
                return advertisement;
            }
        });
        setAdvertisementsToShow(
            filteredAds.map((advertisement) => (
                <AdvertisementCard
                    key={advertisement._id}
                    advertisement={advertisement}
                    onClickFunction={() => {
                        console.log("Clicked");
                    }}
                />
            ))
        );
    }, [advertisements]);

    const getAds = () => {
        setDataRequested(true);
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all`
            )
            .then((res) => {
                if (res.status === 200) {
                    setAdvertisements(res.data);
                    setDataLoaded(true);
                }
            })
            .catch(() => {
                console.log("Error");
            });
    };

    return (
        <div>
            <Heading text="Buscar productos" />
            <div className="ml-5 mr-5">
                <TextField
                    InputProps={{
                        startAdornment: (
                            <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                    fullWidth
                    id="searchField"
                    value={searchParams.get("search") || ""}
                    onChange={handleSearch}
                ></TextField>
            </div>
            <div className="mt-3 ml-5 mr-5 divide-y-2 pb-20">
                {dataLoaded ? (
                    advertisementsToShow
                ) : dataRequested && minimumTimeElapsed ? (
                    <>
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

export default Search;
