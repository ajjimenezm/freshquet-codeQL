import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import Advertisement from "../../types/Advertisement";
import AdvertisementCardStandard from "../shared/AdvertismentCardStandard";

interface SellerProductProps {
    seller_id: string;
    onProductClick: (ads: Advertisement[], index: number) => void;
}

const SellerProducts = (props: SellerProductProps) => {
    const navigate = useNavigate();
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [advertisementsToShow, setAdvertisementsToShow] =
        useState<JSX.Element[]>();

    useEffect(() => {
        AdvertisementManagement.GetAllAdvertisementsFromSeller(
            props.seller_id
        ).then((res) => {
            setAdvertisements(res);
        });
    }, []);

    useEffect(() => {
        setAdvertisementsToShow(
            advertisements.map((ad, index) => {
                return (
                    <div key={ad._id} className="mb-2">
                        <AdvertisementCardStandard
                            advertisement={ad}
                            onClick={() => {
                                props.onProductClick(advertisements, index);
                            }}
                        />
                    </div>
                );
            })
        );
    }, [advertisements]);

    return (
        <div>
            {advertisementsToShow && advertisementsToShow.length > 0 ? (
                advertisementsToShow
            ) : (
                <div className="mt-1 text-center">
                    <h1 className="font-space-mono text-[14px] font-semibold">
                        No products found
                    </h1>
                </div>
            )}
        </div>
    );
};

export default SellerProducts;
