import axios, { AxiosResponse } from "axios";
import React from "react";
import { useState } from "react";
import { Slide } from "react-slideshow-image";
import { ReactComponent as SmallStar } from "../../assets/icons/SmallStar.svg";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import UserHelper from "../../libs/UserHelper";

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

    React.useEffect(() => {
        AdvertisementManagement.GetImageAdvertisment(props.productId).then(
            (res) => {
                setProductImages([
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
                ]);
            }
        );
    }, []);

    React.useEffect(() => {
        console.log(productImages);
        setProductImagesSlides(
            productImages.map((image, index) => {
                return (
                    <div className="each-slide" key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "contain",
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

    return (
        <div className="relative h-screen w-screen shrink-0 snap-center snap-always bg-black">
            {productImagesSlides.length > 0 && (
                <Slide
                    easing="ease"
                    canSwipe={true}
                    transitionDuration={300}
                    arrows={false}
                >
                    {productImagesSlides}
                </Slide>
            )}
            <div className="absolute bottom-0 left-0 z-20 flex w-screen flex-col bg-gradient-to-t from-black pt-16">
                <div className="flex-rows flex w-screen items-stretch pl-4 pr-4 font-outfit text-white">
                    <div className="flex-grow text-xl font-semibold">
                        {props.productName}
                    </div>
                    <div className="text-xl font-semibold">
                        {props.productPrice + "€/Kg"}
                    </div>
                </div>
                <div className="flex-rows mt-3 flex w-screen items-start pl-4 pr-4 font-outfit text-white">
                    <img
                        src={sellerImage}
                        className="h-6 w-6 rounded-full border border-solid border-white"
                    />
                    <div className="ml-2 text-sm font-light">
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
                    <button className="w-44 rounded-full bg-fresh-verde py-2 px-4 text-xl font-medium text-white">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdDetailBuyer;
