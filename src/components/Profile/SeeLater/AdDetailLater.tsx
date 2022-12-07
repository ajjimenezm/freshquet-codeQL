import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { ReactComponent as SmallStar } from "../../../assets/icons/SmallStar.svg";
import AdvertisementManagement from "../../../libs/AdvertisementManagement";
import UserHelper from "../../../libs/UserHelper";
import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import BuyAdDialog from "../../advertisements/BuyAdvertisement/BuyAdDialog";
import { User } from "../../../types/User";
import { IconButton } from "@mui/material";
import { ReactComponent as NotFavouriteIcon } from "../../../assets/icons/NotFavouriteIcon.svg";
import { ReactComponent as FavouriteIcon } from "../../../assets/icons/FavouriteIcon.svg";
import Advertisement from "../../../types/Advertisement";

function AdDetailLater() {
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState<Advertisement>();
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productImagesSlides, setProductImagesSlides] = useState<JSX.Element[]>(
    []
  );
  const [sellerImage, setSellerImage] = useState<string>("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<BottomSheetRef>(null);
  const [distance, setDistance] = useState<string>("");
  const [user, setUser] = useState<User>();

  React.useEffect(() => {
    if (id) {
      AdvertisementManagement.GetAdvertisementById(id).then((res) => {
        setAdvertisement(res);
      });
      const productImagesGet = AdvertisementManagement.GetProductPictures(id);
      if (advertisement?.sellerId) {
        UserHelper.getUserById(advertisement?.sellerId._id).then((res) => {
          UserHelper.retrieveProfilePicture(res.profile_picture).then((res) => {
            setSellerImage(res);
          });
        });
      }

      productImagesGet.then((res) => {
        setProductImages(res);
      });

      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLocs = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        if (advertisement?.sellerId) {
          AdvertisementManagement.GetDistanceFormSeller(
            advertisement?.sellerId._id,
            userLocs.latitude,
            userLocs.longitude
          ).then((res) => {
            setDistance(res);
          });
        }
      });
    }
  }, []);

  React.useEffect(() => {
    setProductImagesSlides(
      productImages.map((image, index) => {
        return (
          <div className="each-slide" key={index}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
              }}
            ></div>
          </div>
        );
      })
    );
  }, [productImages]);

  React.useEffect(() => {
    UserHelper.getUserById(localStorage.getItem("userId") || "").then((res) => {
      setUser(res);
    });
  }, [user]);

  function onDismiss() {
    setOpen(false);
  }

  const handleProductBuy = () => {
    ref.current?.snapTo(({ snapPoints }) => Math.max(...snapPoints));
  };

  const storeProd = () => {
    //petición al back con el user
    if (!user?.adsInSeeLater.includes(id!)) {
      user?.adsInSeeLater.push(id!);
      UserHelper.UpdateUserData(user!);
    } else {
      const idRemove = user?.adsInSeeLater.indexOf(id!);
      user?.adsInSeeLater.splice(idRemove, 1);
      UserHelper.UpdateUserData(user!);
    }
  };

  return (
    <div className="relative z-[1] h-screen w-screen shrink-0 snap-center snap-always bg-black">
      {productImagesSlides.length > 0 && (
        <Slide
          easing="ease"
          canSwipe={true}
          transitionDuration={500}
          arrows={false}
          duration={2000}
          infinite={productImages.length > 1}
          autoplay={productImages.length > 1}
        >
          {productImagesSlides}
        </Slide>
      )}
      {productImagesSlides.length == 0 && (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
          <div className="animate-pulse text-center font-outfit text-5xl font-bold text-neutral-400">
            freshquet
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 z-[2] flex w-screen flex-col bg-gradient-to-t from-black pt-16">
        <div className="flex-rows flex w-screen items-stretch pl-4 pr-4 font-outfit text-white">
          <div className="flex-grow text-xl font-semibold">
            {advertisement?.name}
          </div>
          <div>
            <IconButton onClick={storeProd}>
              {user?.adsInSeeLater.includes(id!) && <FavouriteIcon />}
              {!user?.adsInSeeLater.includes(id!) && <NotFavouriteIcon />}
            </IconButton>
          </div>
          <div className="text-xl font-semibold">
            {advertisement?.pricePerKilogram + "€/Kg"}
          </div>
        </div>
        <div className="flex-rows mt-3 flex w-screen items-start pl-4 pr-4 font-outfit text-white">
          {sellerImage !== "" && (
            <img
              src={sellerImage}
              className="h-6 w-6 rounded-full border border-solid border-white"
              onClick={() => {
                navigate("/seller/" + advertisement?.sellerId._id);
              }}
            />
          )}
          {sellerImage === "" && (
            <div
              className="h-6 w-6 animate-pulse rounded-full border border-solid border-white bg-white"
              onClick={() => {
                navigate("/seller/" + advertisement?.sellerId._id);
              }}
            ></div>
          )}

          <div
            className="ml-2 text-sm font-light"
            onClick={() => {
              navigate("/seller/" + advertisement?.sellerId._id);
            }}
          >
            {advertisement?.sellerId.name}
          </div>
          <div className="ml-2 mr-2 text-sm font-bold">·</div>
          <div className="flex flex-row items-center text-sm font-light">
            {advertisement?.averageReviewScore}
            <span className="ml-1 align-middle">
              <SmallStar className="h-3 w-3 fill-white stroke-white align-middle" />
            </span>
          </div>
          <div className="ml-2 mr-2 text-sm font-bold">·</div>
          {distance === "" && (
            <div className="mt-1 h-4 w-24 animate-pulse bg-neutral-400 align-middle"></div>
          )}
          {distance !== "" && (
            <div className="text-sm font-light">A {distance}km de ti</div>
          )}
        </div>
        <div className="mt-6 flex w-screen flex-row items-center justify-center pb-7 font-outfit text-white">
          <button
            className="h-11 w-44 rounded-full bg-fresh-verde py-2 px-4 text-xl font-medium text-white active:bg-fresh-verde-oscuro"
            onClick={() => {
              setOpen(true);
            }}
          >
            Comprar
          </button>
        </div>
      </div>
      {productImages.length === 0 && (
        <div className="absolute bottom-0 z-[2] flex max-h-full w-screen flex-row items-center justify-center">
          <div className=" mb-2 h-0.5 w-36 max-w-full animate-ping bg-neutral-400"></div>
        </div>
      )}
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
        ref={ref}
      >
        <BuyAdDialog id={id!} onBuy={handleProductBuy} />
      </BottomSheet>
    </div>
  );
}

export default AdDetailLater;
