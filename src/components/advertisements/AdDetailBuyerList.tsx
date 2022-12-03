import AdDetailBuyer from "./AdDetailBuyer";
import { ReactComponent as NegativeBack } from "../../assets/icons/NegativeBack.svg";
import Advertisement from "../../types/Advertisement";
import React from "react";

interface AdDetailBuyerListProps {
    category: string;
    products: Advertisement[];
    onBack: () => void;
    productToOpen: number;
}

function AdDetailBuyerList(props: AdDetailBuyerListProps) {
    const [cards, setCards] = React.useState<JSX.Element[]>();
    const list = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        setCards(
            props.products.map((product, index) => (
                <AdDetailBuyer
                    key={index}
                    productId={product._id}
                    productName={product.name}
                    productPrice={product.pricePerKilogram}
                    sellerName={product.sellerId.name}
                    sellerId={product.sellerId._id}
                    productRating={product.averageReviewScore}
                />
            ))
        );
    }, []);

    React.useEffect(() => {
        list.current?.scrollTo(0, props.productToOpen * window.innerHeight);
    }, [cards]);

    return (
        <div
            className="flex h-screen w-screen snap-y snap-mandatory flex-col overflow-scroll"
            ref={list}
        >
            <div
                className="absolute top-0 left-0 z-[2] flex w-screen flex-row items-center bg-gradient-to-b from-black pt-16 pb-16 "
                onClick={props.onBack}
            >
                <NegativeBack className="ml-6 h-5 w-3" />
                <h1 className="absolute w-screen flex-grow text-center font-outfit text-lg font-medium text-white">
                    {props.category}
                </h1>
            </div>

            {cards}
        </div>
    );
}

export default AdDetailBuyerList;
