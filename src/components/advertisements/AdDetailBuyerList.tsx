import AdDetailBuyer from "./AdDetailBuyer";
import { ReactComponent as NegativeBack } from "../../assets/icons/NegativeBack.svg";

function AdDetailBuyerList() {
    return (
        <div className="flex h-screen w-screen snap-y snap-mandatory flex-col overflow-scroll">
            <div className="absolute top-0 left-0 z-20 flex w-screen flex-row bg-gradient-to-b from-black pt-16 pb-12">
                <NegativeBack className="ml-6 h-5 w-3" />
            </div>
            <AdDetailBuyer
                productName="Tomato"
                productPrice={1.2}
                sellerName="Venedor"
                sellerPicture="https://play-lh.googleusercontent.com/8ID9RW2dLGPxai5r5W_c-JESdD2a_lyAfX0hncKq0bqLuFcC-qfstgTPfmtynR9jYg"
                sellerId="test"
                productRating={4.9}
                productImages={[
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
                ]}
            />
            <AdDetailBuyer
                productName="Tomato"
                productPrice={1.2}
                sellerName="Venedor"
                sellerPicture="https://play-lh.googleusercontent.com/8ID9RW2dLGPxai5r5W_c-JESdD2a_lyAfX0hncKq0bqLuFcC-qfstgTPfmtynR9jYg"
                sellerId="test"
                productRating={4.9}
                productImages={[
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
                ]}
            />
            <AdDetailBuyer
                productName="Tomato"
                productPrice={1.2}
                sellerName="Venedor"
                sellerPicture="https://play-lh.googleusercontent.com/8ID9RW2dLGPxai5r5W_c-JESdD2a_lyAfX0hncKq0bqLuFcC-qfstgTPfmtynR9jYg"
                sellerId="test"
                productRating={4.9}
                productImages={[
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
                ]}
            />
        </div>
    );
}

export default AdDetailBuyerList;
