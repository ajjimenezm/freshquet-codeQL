import AdDetailBuyer from "./AdDetailBuyer";
import { ReactComponent as NegativeBack } from "../../assets/icons/NegativeBack.svg";
import Advertisement from "../../types/Advertisement";

interface AdDetailBuyerListProps {
    category: string;
    products: Advertisement[];
    onBack: () => void;
}

function AdDetailBuyerList(props: AdDetailBuyerListProps) {
    const cards = props.products.map((product, index) => (
        <AdDetailBuyer
            key={index}
            productId={product._id}
            productName={product.name}
            productPrice={product.pricePerKilogram}
            sellerName={product.sellerId.name}
            sellerId={product.sellerId._id}
            productRating={product.averageReviewScore}
        />
    ));
    return (
        <div className="flex h-screen w-screen snap-y snap-mandatory flex-col overflow-scroll">
            <div
                className="absolute top-0 left-0 z-30 flex w-screen flex-row items-center bg-gradient-to-b from-black pt-16 pb-16 "
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
