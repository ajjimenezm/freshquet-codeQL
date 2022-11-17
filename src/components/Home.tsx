import Advertisement from "../types/Advertisement";
import AdvertisementCard from "./AdvertisementCard";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import axios from "axios";
import React from "react";
import AdvertisementCardSkeleton from "./AdvertisementCardSkeleton";
import AddProduct from "./advertisements/AddProduct";
import AddIcon from "@mui/icons-material/Add";
import { Button, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShopFilters } from "./ShopFilters";
import { getDistanceFromLatLonInKm } from "../libs/DistanceCalc";

const Home = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();
  const [sellerIds, setSellerIds] = React.useState<string[]>([]);
  const [advertisements, setAdvertisements] = React.useState<Advertisement[]>(
    []
  );
  const [minimumTimeElapsed, setMinimumTimeElapsed] = React.useState(false);
  const waitingTimeSkeletonLoader = 500;

  const [userRole, setUserRole] = React.useState<string>();

  const [openModal, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const filterByDistance = (
    filterValue: number,
    ads: Advertisement[],
    userLocs: any
  ) => {
    const adsToShow: Advertisement[] = [];
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/coordinates`,
        sellerIds,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        res.data.map((seller: any) => {
          const distance = getDistanceFromLatLonInKm(
            seller.latitude,
            seller.longitude,
            userLocs.latitude,
            userLocs.longitude
          );
          if (distance < filterValue) {
            const ad = ads.find((ad) => ad.sellerId === seller._id);
            if (ad) adsToShow.push(ad);
          }
        });
      });
    return advertisements;
  };

  const handleClose = async (filters: any) => {
    setOpen(false);
    let filteredAdvertisements: Advertisement[] = advertisements;
    const minPrice = parseInt(filters.min_price);
    const maxPrice = parseInt(filters.max_price);
    const distanceFilter = filters.distanceFilter;
    const distanceFilterValue = filters.distanceFilterValue;

    if (distanceFilter) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocs = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        filteredAdvertisements = filterByDistance(
          distanceFilterValue,
          advertisements,
          userLocs
        );
      });
    }

    //Do not apply filters if there is an error on the input
    if ((minPrice !== -1 || maxPrice !== 0) && minPrice <= maxPrice) {
      filteredAdvertisements = filteredAdvertisements.map(
        (ad: any, idx: any) => {
          if (
            ad.pricePerKilogram >= minPrice &&
            ad.pricePerKilogram <= maxPrice
          ) {
            return ad;
          }
        }
      );
    }

    setAdvertisementsToShow(
      filteredAdvertisements.map((ad: Advertisement, idx: number) => {
        return <AdvertisementCard key={idx} advertisement={ad} />;
      })
    );
  };

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
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        setUserRole(res.data.userRole);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all`)
      .then((response) => {
        if (response.status === 200) {
          const sellerIds = response.data.map(
            (ad: Advertisement) => ad.sellerId
          );
          setSellerIds(sellerIds);
          setAdvertisements(response.data);
          console.log(response.data);
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
  }, [advertisements, dataLoaded]);

  return (
    <div>
      <Heading text="Lo más fresco para tí" />
      <SubHeading text="Creemos que estos productos pueden interesarte" />
      <div className="my-4 border-y-2 p-4 text-right">
        <ShopFilters open={openModal} handleClose={handleClose} />
        <Button variant="contained" onClick={handleOpen}>
          Filtros
        </Button>
      </div>
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

      {userRole == "seller" ? (
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
