import {
  getSearchHistory,
  addSearchHistory,
  checkIfSearchHistoryExists,
  removeSearchHistory,
} from "../../libs/SearchHistory";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdvertisementCard from "../Home/AdvertismentCard";
import AdvertisementCardSkeleton from "../AdvertisementCardSkeleton";
import Advertisement from "../../types/Advertisement";
import SearchHistoryElement from "./SearchHistoryElement";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import SearchField from "./SearchField";
import SearchPlaceHolder from "./SearchPlaceHolder";
import { ReactComponent as BackArrow } from "../../assets/icons/BackArrow.svg";
import { getDistanceFromLatLonInKm } from "../../libs/DistanceCalc";
import axios from "axios";
import AdDetailBuyerList from "../advertisements/AdDetailBuyerList";
import AdvertisementCardStandard from "../Home/AdvertismentCardStandard";
import NearbyAdCard from "../Home/NearbyAdCard";

function Search() {
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [sellerIds, setSellerIds] = React.useState<string[]>([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [dataRequested, setDataRequested] = React.useState(false);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();
  const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
    []
  );
  const [showProductDetails, setShowProductDetails] = React.useState(false);
  const [productToOpen, setProductToOpen] = React.useState(0);
  const [filteredAds, setFilteredAds] = React.useState<Advertisement[]>([]);
  const [min_price, setMinPrice] = React.useState<any>(-1);
  const [max_price, setMaxPrice] = React.useState<any>(0);
  const [typeProduct, setTypeProduct] = React.useState<any>("");
  const [distanceFilter, setDistanceFilter] = React.useState<any>(false);
  const [distanceFilterValue, setDistanceFilterValue] = React.useState<any>();
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
      const searchedAdsArray = advertisements.filter((advertisement) => {
        if (
          advertisement.name
            .toLowerCase()
            .includes(searchParams.get("search")?.toLowerCase() || "")
        ) {
          return advertisement;
        }
      });
      filterWithFilters(searchedAdsArray).then((filteredAds) => {
        setFilteredAds(filteredAds);
      });
    }
  }, [
    advertisements,
    searchParams,
    typeProduct,
    min_price,
    max_price,
    distanceFilter,
    distanceFilterValue,
  ]);

  useEffect(() => {
    setAdvertisementsToShow(
      filteredAds.map((advertisement: any, index) => (
        <NearbyAdCard
          key={advertisement._id}
          advertisement={advertisement}
          onClick={() => {
            setProductToOpen(index);
            setShowProductDetails(true);
          }}
        />
      ))
    );
  }, [filteredAds]);
  const getAds = () => {
    setDataRequested(true);
    AdvertisementManagement.GetAllAdvertisements().then((ads) => {
      setAdvertisements(ads);
      setDataLoaded(true);
    });
  };

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const filterWithFilters = async (ads: Advertisement[]) => {
    console.log(ads);
    let filteredAdvertisements: Advertisement[] = ads;

    if (distanceFilter) {
      const userLocs = {
        latitude: latitude,
        longitude: longitude,
      };
      await AdvertisementManagement.filterByDistance(
        distanceFilterValue,
        advertisements,
        userLocs
      ).then((res) => {
        filteredAdvertisements = res;
      });
    }
    //Do not apply filters if there is an error on the input
    if (typeProduct !== "") {
      const adsToShow: Advertisement[] = [];
      filteredAdvertisements.map((ad: any, idx: any) => {
        if (ad.category === typeProduct) {
          adsToShow.push(ad);
        }
      });
      filteredAdvertisements = adsToShow;
    }

    //Do not apply filters if there is an error on the input
    if ((min_price !== -1 || max_price !== 0) && min_price <= max_price) {
      const adsToShow: Advertisement[] = [];
      filteredAdvertisements.map((ad: any, idx: any) => {
        if (
          ad.pricePerKilogram >= min_price &&
          ad.pricePerKilogram <= max_price
        ) {
          adsToShow.push(ad);
        }
      });
      filteredAdvertisements = adsToShow;
    }
    return filteredAdvertisements;
  };

  const getfilters = (
    minPrice: number,
    maxPrice: number,
    typeProduct: string,
    distanceFilter: string,
    distanceFilterValue: number
  ) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setTypeProduct(typeProduct);
    setDistanceFilter(distanceFilter);
    setDistanceFilterValue(distanceFilterValue);
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

  const handleFocus = () => {
    setSearchFocused(true);
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
    <>
      {showProductDetails && (
        <AdDetailBuyerList
          category="Resultados de búsqueda"
          products={filteredAds}
          onBack={() => {
            setShowProductDetails(false);
          }}
          productToOpen={productToOpen}
        />
      )}
      {!showProductDetails && (
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
                getFilters={getfilters}
                id="searchField"
                value={searchParams.get("search") || ""}
                onChange={handleSearch}
                onFocus={handleFocus}
              />
            </div>
          </div>
          {searchFocused &&
            (!searchParams.get("search") ||
              searchParams.get("search") === "") && (
              <div className="ml-16 mr-10 mt-5">{searchHistoryElements}</div>
            )}
          {searchParams.get("search") &&
            searchParams.get("search") !== "" &&
            (dataLoaded ? (
              <div className="m-4 space-y-4"> {advertisementsToShow}</div>
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
          {!searchFocused &&
            (searchParams.get("search") === null ||
              searchParams.get("search") === "") && (
              <div className="absolute left-0 right-0 mt-16 ml-auto mr-auto h-max w-screen flex-row items-center">
                <SearchPlaceHolder />
              </div>
            )}
        </div>
      )}
    </>
  );
}

export default Search;
