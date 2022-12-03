import React, { useEffect, useState } from "react";
import UserHelper from "../../../libs/UserHelper";
import axios from "axios";
import { User } from "../../../types/User";
import AdCards from "./AdCards";

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
      setAdvertisements(res.adsInSeeLater);
    });
  }, []);

  React.useEffect(() => {
    setAdvertisementsToShow(
      allAdvertisements.map((ad) => {
        return <AdCards key={ad} ad_id={ad} />;
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
      <h1>PRODUCTOS VER MÁS TARDE DE {user?.name}</h1>
      {advertisementsToShow?.length}
      <div className=" m-4 space-y-4">{advertisementsToShow}</div>
      <p>{user?.adsInSeeLater.length}</p>
    </>
  );
}

export default SeesLater;
