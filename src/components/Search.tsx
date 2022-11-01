import {
    getSearchHistory,
    addSearchHistory,
    checkIfSearchHistoryExists,
} from "../libs/SearchHistory";
import TextField from "@mui/material/TextField";
import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdvertisementCard from "./AdvertisementCard";
import AdvertisementCardSkeleton from "./AdvertisementCardSkeleton";
import Heading from "./Heading";
import axios from "axios";
import Advertisement from "../types/Advertisement";
import SearchHistoryElement from "./search/SearchHistoryElement";
import SearchHistoryElementSkeleton from "./search/SearchHistoryElementSkeleton";
import AdvertisementManagement from "../libs/AdvertisementManagement";

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
    const [localStorageLoaded, setLocalStorageLoaded] = React.useState(false);
    const waitingTimeSkeletonLoader = 500;
    const [searchHistoryElements, setSearchHistoryElements] =
        React.useState<JSX.Element[]>();

    const navigate = useNavigate();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ search: event.target.value });

        if (event.target.value.length > 0) {
            setMinimumTimeElapsed(false);
            if (!dataLoaded) {
                getAds();
            }
            setTimeout(() => {
                setMinimumTimeElapsed(true);
            }, waitingTimeSkeletonLoader);
        }
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (
                !checkIfSearchHistoryExists(searchParams.get("search")) &&
                searchParams.get("search") !== "" &&
                searchParams.get("search") !== null
            ) {
                addSearchHistory(searchParams.get("search"));
            }
            setSearchHistoryElements(loadSearchHistory());
        }, 2000);
        return () => clearTimeout(timer);
    }, [advertisementsToShow]);

    React.useEffect(() => {
        const user = localStorage.getItem("userToken");
        if (!user) {
            navigate("/login");
        }
        setTimeout(() => {
            setLocalStorageLoaded(true);
        }, 2000);
        loadSearchHistory();

        if (searchParams.get("search") && searchParams.get("search") !== "") {
            setTimeout(() => {
                setMinimumTimeElapsed(true);
            }, waitingTimeSkeletonLoader);

            getAds();
        }
    }, []);

    React.useEffect(() => {
        if (!dataRequested) {
            getAds();
        } else {
            const filteredAds = advertisements.filter((advertisement) => {
                if (
                    advertisement.name
                        .toLowerCase()
                        .includes(
                            searchParams.get("search")?.toLowerCase() || ""
                        )
                ) {
                    return advertisement;
                }
            });
            setAdvertisementsToShow(
                filteredAds.map((advertisement) => (
                    <AdvertisementCard
                        key={advertisement._id}
                        advertisement={advertisement}
                    />
                ))
            );
        }
    }, [advertisements, searchParams]);

    const getAds = () => {
        setDataRequested(true);
        AdvertisementManagement.GetAllAdvertisements().then((ads) => {
            setAdvertisements(ads);
            setDataLoaded(true);
        });
    };

    const loadSearchHistory = () => {
        const searchHistory = getSearchHistory();
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
                {!localStorageLoaded ? (
                    <>
                        <SearchHistoryElementSkeleton />
                        <SearchHistoryElementSkeleton />
                        <SearchHistoryElementSkeleton />
                        <SearchHistoryElementSkeleton />
                    </>
                ) : !searchParams.get("search") ||
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
                    <></>
                )}
            </div>
        </div>
    );
}

export default Search;
