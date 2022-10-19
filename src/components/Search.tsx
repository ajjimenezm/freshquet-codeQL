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
import SearchHistoryElement from "./SearchHistoryElement";

function Search() {
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [dataRequested, setDataRequested] = React.useState(false);
    const [minimumTimeElapsed, setMinimumTimeElapsed] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [advertisementsToShow, setAdvertisementsToShow] =
        React.useState<JSX.Element[]>();
    const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
        []
    );
    const [saveToHistory, setSaveToHistory] = React.useState(false);
    const waitingTimeSkeletonLoader = 500;
    const [searchHistoryElements, setSearchHistoryElements] =
        React.useState<JSX.Element[]>();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ search: event.target.value });

        if (event.target.value.length > 0) {
            setMinimumTimeElapsed(false);
            getAds();
            setTimeout(() => {
                setMinimumTimeElapsed(true);
            }, waitingTimeSkeletonLoader);

            setTimeout(() => {
                setSaveToHistory(true);
            }, 3000);
        }
    };
    React.useEffect(() => {
        if (searchParams.get("search")) {
            setTimeout(() => {
                setMinimumTimeElapsed(true);
            }, waitingTimeSkeletonLoader);

            getAds();
        }
    }, []);

    React.useEffect(() => {
        if (localStorage.getItem("searchHistory") === null) {
            localStorage.setItem("searchHistory", JSON.stringify([]));
        }
        if (saveToHistory) {
            const searchHistory = JSON.parse(
                localStorage.getItem("searchHistory") || "[]"
            );
            if (
                !searchHistory.includes(searchParams.get("search")) &&
                searchParams.get("search") !== ""
            ) {
                searchHistory.push(searchParams.get("search"));
                localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(searchHistory)
                );
            }
        }
        saveToHistory && setSaveToHistory(false);
        setSearchHistoryElements(loadSearchHistory());
    }, [saveToHistory]);

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

    const loadSearchHistory = () => {
        const searchHistory = JSON.parse(
            localStorage.getItem("searchHistory") || "[]"
        );
        return searchHistory.map((historyString: string) => (
            <SearchHistoryElement
                key={historyString}
                historyString={historyString}
                onHistoryClick={(historyString: string) => {
                    setSearchParams({ search: historyString });
                }}
            />
        ));
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
                {!searchParams.get("search") ||
                searchParams.get("search")?.length == 0 ? (
                    searchHistoryElements
                ) : dataLoaded ? (
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
