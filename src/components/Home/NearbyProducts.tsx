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
  const [areAdvertisementsSet, setAreAdvertisementsSet] = React.useState(false);

  const [showProductDetail, setShowProductDetail] = React.useState(false);
  const [productToOpen, setProductToOpen] = React.useState(0);
  const [adDetailBuyerList, setAdDetailBuyerList] =
    React.useState<JSX.Element[]>();

  useEffect(() => {
    AdvertisementManagement.GetAllAdvertisements().then((res) => {
      setAdvertisements(res);
      setAreAdvertisementsSet(true);
    });
  }, []);

  React.useEffect(() => {
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

      AdvertisementManagement.filterByDistance(
        25,
        advertisements,
        userLocs
      ).then((res) => {
        setAdvertisements(res);
        setAdvertisementsToShow(
          res.map((ad, index) => {
            return (
              <NearbyAdCard
                key={ad._id}
                advertisement={ad}
                onClick={() => {
                  setProductToOpen(index);
                  setShowProductDetail(true);
                }}
              />
            );
          })
        );
      });
    });
  }, [areAdvertisementsSet]);

  return (
    <>
      {showProductDetail && (
        <AdDetailBuyerList
          category="Productos cercanos"
          products={advertisements}
          onBack={() => {
            setShowProductDetail(false);
          }}
          productToOpen={productToOpen}
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
            <p className=" font-[18px] font-space-mono font-bold">{address}</p>
          </div>

          <div className=" m-4 space-y-4">{advertisementsToShow}</div>
        </div>
      )}
    </>
  );
};

export default NearbyProducts;
