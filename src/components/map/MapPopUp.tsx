import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import Navigation from "../../libs/Navigation";
import UserHelper from "../../libs/UserHelper";
import { User } from "../../types/User";
import SellerCard from "../Home/SellerCard";

interface MapPopUpProps {
  storeName: string;
  storeId: string;
  storeDirection: string;
  storeLatitude: number;
  storeLongitude: number;
}

function MapPopUp(props: MapPopUpProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    UserHelper.getUserById(props.storeId.toString()).then((res) => {
      setUser(res);
      console.log(props.storeId);
    });
  }, []);

  return (
    <Popup className="mypopup">
      {user ? <SellerCard seller={user} /> : <div />}
    </Popup>
  );
}

export default MapPopUp;
