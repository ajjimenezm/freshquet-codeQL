import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";

interface ICompra {
  _id: string;
  adv_id: string;
  buyer_id: string;
  quantity: number;
  is_ended: boolean;
  price: number;
  seller_id: string;
  confirmation_code: string;
  review_text: string;
  name: string;
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
        let config;
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
        console.log(ad);
        return <OrderCard key={ad._id} compra={ad} />;
      })
    );
  }, [dataLoaded]);

  return (
    <div>
      <div className=" space-y-4">{advertisementsToShow}</div>
    </div>
  );
};

export default AdvertismentHistory;
