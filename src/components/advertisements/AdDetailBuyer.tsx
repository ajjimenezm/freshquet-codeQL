import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { ReactComponent as SmallStar } from "../../assets/icons/SmallStar.svg";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import UserHelper from "../../libs/UserHelper";
import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import BuyAdDialog from "./BuyAdvertisement/BuyAdDialog";

interface AdDetailBuyerProps {
    productName: string;
    productPrice: number;
    sellerName: string;
    sellerId: string;
    productRating: number;
    productId: string;
}

function AdDetailBuyer(props: AdDetailBuyerProps) {
    const [productImages, setProductImages] = useState<string[]>([]);
    const [productImagesSlides, setProductImagesSlides] = useState<
        JSX.Element[]
    >([]);
    const [sellerImage, setSellerImage] = useState<string>("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef<BottomSheetRef>(null);

    React.useEffect(() => {
        const productImagesGet = AdvertisementManagement.GetProductPictures(
            props.productId
        );
        UserHelper.getUserById(props.sellerId).then((res) => {
            UserHelper.retrieveProfilePicture(res.profile_picture).then(
                (res) => {
                    setSellerImage(res);
                }
            );
        });

        productImagesGet.then((res) => {
            setProductImages(res);
        });
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

    function onDismiss() {
        setOpen(false);
    }

    const handleProductBuy = () => {
        ref.current?.snapTo(({ snapPoints }) => Math.max(...snapPoints));
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
                        {props.productName}
                    </div>
                    <div className="text-xl font-semibold">
                        {props.productPrice + "€/Kg"}
                    </div>
                </div>
                <div className="flex-rows mt-3 flex w-screen items-start pl-4 pr-4 font-outfit text-white">
                    {sellerImage !== "" && (
                        <img
                            src={sellerImage}
                            className="h-6 w-6 rounded-full border border-solid border-white"
                            onClick={() => {
                                navigate("/seller/" + props.sellerId);
                            }}
                        />
                    )}
                    {sellerImage === "" && (
                        <div
                            className="h-6 w-6 animate-pulse rounded-full border border-solid border-white bg-white"
                            onClick={() => {
                                navigate("/seller/" + props.sellerId);
                            }}
                        ></div>
                    )}

                    <div
                        className="ml-2 text-sm font-light"
                        onClick={() => {
                            navigate("/seller/" + props.sellerId);
                        }}
                    >
                        {props.sellerName}
                    </div>
                    <div className="ml-2 mr-2 text-sm font-bold">·</div>
                    <div className="flex flex-row items-center text-sm font-light">
                        {props.productRating}
                        <span className="ml-1 align-middle">
                            <SmallStar className="h-3 w-3 fill-white stroke-white align-middle" />
                        </span>
                    </div>
                    <div className="ml-2 mr-2 text-sm font-bold">·</div>
                    <div className="text-sm font-light">A 2km de ti</div>
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
                snapPoints={({ minHeight, maxHeight }) => [
                    minHeight,
                    maxHeight,
                ]}
                ref={ref}
            >
                <BuyAdDialog id={props.productId} onBuy={handleProductBuy} />
            </BottomSheet>
        </div>
    );
}

export default AdDetailBuyer;
