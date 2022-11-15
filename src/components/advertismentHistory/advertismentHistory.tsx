import Advertisement from "../../types/Advertisement";
import AdvertisementCard from "../AdvertisementCard";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import axios from "axios";
import React from "react";
import AdvertisementCardSkeleton from "../AdvertisementCardSkeleton";
import AddProduct from "../advertisements/AddProduct";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdvHistoryCard from "./advHistoryCard";
import AdvHistoryCardBuyer from "./advHistoryCardBuyer";

interface ICompra {
  _id: string;
  adv_id: string;
  buyer_id: string;
  quantity: number;
  is_ended: boolean;
  price: number;
  seller_id: string;
  confirmation_code: string;
}

const AdvertismentHistory = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();
  const [advertisements, setAdvertisements] = React.useState<ICompra[]>([]);

  const [userRole, setUserRole] = React.useState<string>();

  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem("userToken");
    if (!user) {
      navigate("/login");
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.userRole);
        setUserRole(res.data.userRole);
        let config;
        console.log("USER ROLE " + userRole);
        if (res.data.userRole === "seller") {
          config = {
            method: "get",
            url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/all/sell/${res.data.userId}`,
            headers: {},
          };
        } else if (res.data.userRole === "buyer") {
          config = {
            method: "get",
            url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/all/buy/${res.data.userId}`,
            headers: {},
          };
        }
        if (config !== undefined) {
          axios(config).then(function (response: any) {
            if (response.status === 200) {
              console.log("DATA " + response);
              console.log(response);
              setAdvertisements(response.data);
              setDataLoaded(true);
            }
          });
        }
      });
  }, []);

  React.useEffect(() => {
    console.log(advertisements);
  }, [advertisements]);

  React.useEffect(() => {
    setAdvertisementsToShow(
      advertisements.map((ad: ICompra) => {
        if (userRole === "seller") {
          console.log("ad:", ad);
          0;
          return (
            <AdvHistoryCard
              key={ad._id}
              compra_id={ad._id}
              adv_id={ad.adv_id}
              buyer_id={ad.buyer_id}
              quantity={ad.quantity}
              is_ended={ad.is_ended}
              price={ad.price}
            />
          );
        } else if (userRole === "buyer") {
          console.log("ad:", ad);
          return (
            <AdvHistoryCardBuyer
              key={ad.adv_id}
              adv_id={ad.adv_id}
              quantity={ad.quantity}
              is_ended={ad.is_ended}
            />
          );
        } else return <p>No hay nada que mostrar</p>;
      })
    );
  }, [dataLoaded]);

  return (
    <div>
      {userRole === "buyer" ? (
        <Heading text="Tus compras" />
      ) : (
        <Heading text="Tus ventas" />
      )}

      <div className="mb-16 ml-5 mr-5 space-y-3 divide-y-2">
        {advertisementsToShow}
      </div>
    </div>
  );
};

export default AdvertismentHistory;
