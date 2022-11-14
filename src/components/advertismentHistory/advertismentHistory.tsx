import Advertisement from "../../types/Advertisement";
import AdvertisementCard from "../AdvertisementCard";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import axios from "axios";
import React from "react";
import AdvertisementCardSkeleton from "../AdvertisementCardSkeleton";
import AddProduct from "../advertisements/AddProduct";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdvHistoryCard from "./advHistoryCard";
import AdvHistoryCardBuyer from "./advHistoryCardBuyer";

interface advHistoryCardProps {
  adv_id: string;
  buyer_id: string;
  quantity: number;
  is_ended: boolean;
}

const AdvertismentHistory = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [advertisementsToShow, setAdvertisementsToShow] =
    React.useState<JSX.Element[]>();
  const [advertisements, setAdvertisements] = React.useState<any>([]);

  const [userRole, setUserRole] = React.useState<string>();
  const [userId, setUserId] = React.useState<string>();

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
        setUserRole(res.data.userRole);
        let config;
        console.log("USER ROLE " + userRole);
        if (userRole === "seller") {
          config = {
            method: "get",
            url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/all/sell/${res.data.userId}`,
            headers: {},
          };
        } else if (userRole === "buyer") {
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
  });

  React.useEffect(() => {
    setAdvertisementsToShow(
      advertisements.map((ad: any) => {
        if (userRole === "seller") {
          console.log("ad:", ad);
          0;
          return (
            <AdvHistoryCard
              key={ad.adv_id}
              adv_id={ad.adv_id}
              buyer_id={ad.buyer_id}
              quantity={ad.quantity}
              is_ended={ad.is_ended}
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
        }
      })
    );
  }, [dataLoaded]);

  return (
    <div>
      <Heading text="Tus productos" />

      <div className="mb-16 ml-5 mr-5 divide-y-2">{advertisementsToShow}</div>
    </div>
  );
};

export default AdvertismentHistory;
