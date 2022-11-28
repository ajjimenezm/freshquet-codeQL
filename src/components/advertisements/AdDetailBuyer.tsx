import { Slide } from "react-slideshow-image";

interface AdDetailBuyerProps {
    productName: string;
    productPrice: number;
    sellerName: string;
    sellerPicture: string;
    sellerId: string;
    productRating: number;
    productImages: string[];
}

function AdDetailBuyer(props: AdDetailBuyerProps) {
    return (
        <div className="h-screen w-screen shrink-0 snap-center snap-always bg-black">
            <Slide
                easing="ease"
                canSwipe={true}
                transitionDuration={300}
                arrows={false}
            >
                {props.productImages.map((image, index) => (
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
                ))}
            </Slide>
        </div>
    );
}

export default AdDetailBuyer;
