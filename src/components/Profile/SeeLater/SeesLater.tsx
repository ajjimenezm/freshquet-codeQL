import React, { useEffect, useState } from "react";
import UserHelper from "../../../libs/UserHelper";
import axios, { AxiosResponse } from "axios";
import { User } from "../../../types/User";
import Advertisement from "../../../types/Advertisement";
import AdvertisementManagement from "../../../libs/AdvertisementManagement";
import { Skeleton } from "@mui/material";
import AdCards from "./AdCards";

//interface SeeLaterProps {
//  adsInSeeLater: string[];
//}

function SeesLater(/*props: SeeLaterProps*/) {
  const [userId, setId] = useState("");
  //const [allAdvertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [allAdvertisements, setAdvertisements] = useState<string[]>([]);
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    UserHelper.getOwnProfile().then((res: User) => {
      //console.log(res);
      setUser(res);
      setAdvertisements(res.adsInSeeLater);
    });
  }, []);

  useEffect(() => {
    UserHelper.getUserById(userId).then((res) => {
      console.log("HELPER");
      console.log(res.adsInSeeLater);
      setAdvertisements(res.adsInSeeLater);
      //setAdvertisements(res);
    });
    //AdvertisementManagement.GetAllAdvertisements().then((res) => {
    //  setAdvertisements(res);
    //});
  }, []);

  React.useEffect(() => {
    //console.log(allAdvertisements);
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

  /*  useEffect(() => {
    ads.forEach((ad) => {
      adNames += ad.name;
    });
  }, [ads]);*/

  return (
    <>
      <h1>PRODUCTOS VER MÁS TARDE DE {user?.name}</h1>
      {advertisementsToShow?.length}
      <div className=" m-4 space-y-4">{advertisementsToShow}</div>
      <p>{user?.adsInSeeLater.length}</p>
      {/*user?.adsInSeeLater.forEach((ad) => {
        <h3>{ad}</h3>;
      })*/}
      {/*adNames*/}
      {/*ads.length > 0 &&
        ads.forEach((ad) => {
          <p>{ad.name}</p>;
        })*/}
      {
        //user?.adsInSeeLater.at(0)}
      }
    </>
  );
}

export default SeesLater;
