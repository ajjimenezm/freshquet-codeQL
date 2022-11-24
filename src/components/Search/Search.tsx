import {
    getSearchHistory,
    addSearchHistory,
    checkIfSearchHistoryExists,
    removeSearchHistory,
} from "../../libs/SearchHistory";
import TextField from "@mui/material/TextField";
import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdvertisementCard from "../AdvertisementCard";
import AdvertisementCardSkeleton from "../AdvertisementCardSkeleton";
import TuneIcon from "@mui/icons-material/Tune";
import Advertisement from "../../types/Advertisement";
import SearchHistoryElement from "./SearchHistoryElement";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import SearchField from "./SearchField";
import SearchPlaceHolder from "./SearchPlaceHolder";
import { ReactComponent as BackArrow } from "../../assets/icons/BackArrow.svg";

function Search() {
    const [searchFocused, setSearchFocused] = React.useState(false);
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
        let timer: NodeJS.Timeout;
        if (
            advertisements.length > 0 &&
            searchParams.get("search") !== null &&
            searchParams.get("search") !== ""
        ) {
            timer = setTimeout(() => {
                if (!checkIfSearchHistoryExists(searchParams.get("search"))) {
                    addSearchHistory(searchParams.get("search"));
                }
                setSearchHistoryElements(loadSearchHistory());
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [advertisementsToShow]);

    React.useEffect(() => {
        const user = localStorage.getItem("userToken");
        if (!user) {
            navigate("/login");
        }
        setSearchHistoryElements(loadSearchHistory());
        setLocalStorageLoaded(true);

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
                onDeleteEntryClick={handleDeleteHistory}
            />
        ));
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setSearchFocused(true);
    };

    const handleUnfocus = (e: React.FocusEvent<HTMLInputElement>) => {
        // setSearchFocused(false);
    };

    const handleBackClick = () => {
        navigate("/search");
        setSearchParams({ search: "" });
        setSearchFocused(false);
    };

    const handleDeleteHistory = (query: string) => {
        removeSearchHistory(query);
        setSearchHistoryElements(loadSearchHistory());
    };

    return (
        <div className="h-screen w-screen bg-fresh-fondo-azul">
            <div className="relative flex w-screen flex-row items-center pr-4 pl-4 pt-16">
                {(searchFocused ||
                    (searchParams.get("search") !== null &&
                        searchParams.get("search") !== "")) && (
                    <div className="ml-1.5 mr-4">
                        <BackArrow
                            className="stroke-fresh-morado"
                            onClick={handleBackClick}
                        />
                    </div>
                )}
                <div
                    className="w-full
                "
                >
                    <SearchField
                        id="searchField"
                        value={searchParams.get("search") || ""}
                        onChange={handleSearch}
                        onFocus={handleFocus}
                        onBlur={handleUnfocus}
                    />
                </div>
            </div>
            {searchFocused &&
                (!searchParams.get("search") ||
                    searchParams.get("search") === "") && (
                    <div className="ml-16 mr-10 mt-5">
                        {searchHistoryElements}
                    </div>
                )}
            {searchParams.get("search") &&
                searchParams.get("search") !== "" &&
                (dataLoaded ? (
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
                ))}

            {/* <div className="mt-3 ml-5 mr-5 divide-y-2 pb-20">
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
                ) : 
                ) : (
                    <></>
                )}
            </div> */}
            {!searchFocused &&
                (searchParams.get("search") === null ||
                    searchParams.get("search") === "") && (
                    <div className="absolute left-0 right-0 mt-16 ml-auto mr-auto h-max w-screen flex-row items-center">
                        <SearchPlaceHolder />
                    </div>
                )}
        </div>
    );
}

export default Search;
