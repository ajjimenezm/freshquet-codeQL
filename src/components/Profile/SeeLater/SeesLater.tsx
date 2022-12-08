import React, { useEffect, useState } from "react";
import UserHelper from "../../../libs/UserHelper";
import axios from "axios";
import { User } from "../../../types/User";
import AdCards from "./AdCards";
import AdvertisementManagement from "../../../libs/AdvertisementManagement";
import AdDetailBuyerList from "../../advertisements/AdDetailBuyerList";
import Advertisement from "../../../types/Advertisement";

function SeesLater() {
    const [userId, setId] = useState("");
    const [allAdvertisements, setAdvertisements] = useState<Advertisement[]>(
        []
    );
    const [stringAdvertisements, setStringAdvertisements] = useState<string[]>(
        []
    );
    const [advertisementsToShow, setAdvertisementsToShow] =
        React.useState<JSX.Element[]>();
    const [user, setUser] = React.useState<User>();

    const [showProductDetail, setShowProductDetail] = React.useState(false);
    const [productToOpen, setProductToOpen] = React.useState(0);

    useEffect(() => {
        UserHelper.getOwnProfile().then((res: User) => {
            setUser(res);
            setStringAdvertisements(res.adsInSeeLater);
        });
    }, []);

    useEffect(() => {
        const localUserId = localStorage.getItem("userId");
        if (localUserId) {
            setId(localUserId);
        }
    }, [userId]);

    useEffect(() => {
        UserHelper.getUserById(userId).then((res) => {
            const promises: Promise<Advertisement>[] = [];
            res.adsInSeeLater.forEach((ad) => {
                const adAux = AdvertisementManagement.GetAdvertisementById(ad);
                promises.push(adAux);
            });
            Promise.all(promises).then((aux) => {
                const aux2 = aux.filter(
                    (ad) =>
                        ad !== undefined &&
                        ad !== null &&
                        (ad as unknown as string) !== ""
                );
                console.log(aux2);
                setAdvertisements(aux2);
            });
        });
    }, [stringAdvertisements]);

    React.useEffect(() => {
        setAdvertisementsToShow(
            allAdvertisements.map((ad, index) => {
                if (ad === undefined) {
                    return <></>;
                }
                const item = (
                    <AdCards
                        key={ad._id}
                        ad_id={ad._id}
                        onClick={() => {
                            setProductToOpen(index);
                            setShowProductDetail(true);
                        }}
                    />
                );
                return item;
            })
        );
    }, [allAdvertisements]);

    return (
        <>
            {showProductDetail && (
                <AdDetailBuyerList
                    category="Productos para ver más tarde"
                    products={allAdvertisements}
                    onBack={() => {
                        setShowProductDetail(false);
                    }}
                    productToOpen={productToOpen}
                />
            )}
            {!showProductDetail && (
                <div className="mt-5 ml-4 pb-20">
                    <div className="mb-6 grid place-items-center">
                        <h1 className="font-space-mono">
                            PRODUCTOS VER MÁS TARDE DE
                        </h1>
                        <h1 className="font-space-mono">{user?.name}</h1>
                    </div>
                    <div className="mt-4 mr-4 mb-4 space-y-4">
                        {advertisementsToShow}
                    </div>
                </div>
            )}
        </>
    );
}

export default SeesLater;
