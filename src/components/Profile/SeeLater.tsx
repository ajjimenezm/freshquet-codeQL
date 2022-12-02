import React, { useEffect, useState } from "react";
import UserHelper from "../../libs/UserHelper";
import axios, { AxiosResponse } from "axios";
import { User } from "../../types/User";
import Advertisement from "../../types/Advertisement";

function SeeLater() {
  const [userId, setId] = useState("");
  const [user, setUser] = useState<User>();
  const [ads, setAdvertisements] = useState<Advertisement[]>([]);
  let adNames = "";
  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    if (localUserId) {
      setId(localUserId);
    }

    const getUser = async () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          setUser(res.data[0]);
        });
    };

    const getAds = async () => {
      const adsUser = user?.adsInSeeLater;
      const aux: any[] | ((prevState: Advertisement[]) => Advertisement[]) = [];
      adsUser?.forEach((ad) => {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${ad}`
          )
          .then((res) => {
            console.log("returning advertisement: " + res.data);
            aux.push(res.data);
            //setProduct(res.data);
            //setSellerId(res.data.sellerId._id);
          });
      });
      setAdvertisements(aux);
    };

    getUser();
    getAds();
  }, [userId]);

  useEffect(() => {
    ads.forEach((ad) => {
      adNames += ad.name;
    });
  }, [ads]);

  return (
    <>
      <h1>PRODUCTOS VER MÁS TARDE DE {user?.name}</h1>
      <p>{user?.adsInSeeLater.length}</p>
      {user?.adsInSeeLater.forEach((ad) => {
        <h3>{ad}</h3>;
      })}
      {adNames}
      {ads.length > 0 &&
        ads.forEach((ad) => {
          <p>{ad.name}</p>;
        })}
      {
        //user?.adsInSeeLater.at(0)}
      }
    </>
  );
}

export default SeeLater;
