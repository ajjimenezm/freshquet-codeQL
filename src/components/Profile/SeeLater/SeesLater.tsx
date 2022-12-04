import React, { useEffect, useState } from "react";
import UserHelper from "../../../libs/UserHelper";
import axios from "axios";
import { User } from "../../../types/User";
import AdCards from "./AdCards";
import AdvertisementManagement from "../../../libs/AdvertisementManagement";
import { error } from "console";

function SeesLater() {
  const [userId, setId] = useState("");
  const [allAdvertisements, setAdvertisements] = useState<string[]>([]);
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    UserHelper.getOwnProfile().then((res: User) => {
      setUser(res);
      setAdvertisements(res.adsInSeeLater);
    });
  }, []);

  useEffect(() => {
    UserHelper.getUserById(userId).then((res) => {
      const aux = [""];
      res.adsInSeeLater.forEach((ad) => {
        const adAux = AdvertisementManagement.GetAdvertisementById(ad);
        if (adAux != null) {
          aux.push(ad);
        }
      });
      setAdvertisements(aux);
    });
  }, []);

  React.useEffect(() => {
    setAdvertisementsToShow(
      allAdvertisements.map((ad) => {
        const item = <AdCards key={ad} ad_id={ad} />;
        return item;
      })
    );
  }, [allAdvertisements]);

  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    if (localUserId) {
      setId(localUserId);
    }
    axios.get;
  }, [userId]);

  return (
    <>
      <div className="mt-5 ml-4">
        <div className="mb-6 grid place-items-center">
          <h1 className="font-space-mono">PRODUCTOS VER MÁS TARDE DE</h1>
          <h1 className="font-space-mono">{user?.name}</h1>
        </div>
        <div className="mt-4 mr-4 mb-4 space-y-4">{advertisementsToShow}</div>
      </div>
    </>
  );
}

export default SeesLater;