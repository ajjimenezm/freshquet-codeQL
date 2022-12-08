import { Button, Divider, Link } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../chatContext/AuthContext";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import ChatHelper from "../../libs/ChatHelper";
import Advertisement from "../../types/Advertisement";

interface IPropsOrderCard {
  compra: ICompra;
}

interface ICompra {
  _id: string;
  adv_id: any;
  buyer_id: any;
  quantity: number;
  is_ended: boolean;
  price: number;
  seller_id: string;
  name: string;
  confirmation_code: string;
}

const OrderCard = (props: IPropsOrderCard) => {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  const [requestSent, setRequestSent] = useState(false);
  useEffect(() => {
    console.log("compra", props.compra);
  }, []);

  const endVenta = () => {
    const text = `La compra de ${props.compra.adv_id.name} por ${props.compra.price}€ ha sido finalizada.`;
    const text2 = `Aquí tiene su codigo de confirmación: ${props.compra.confirmation_code}`;
    AdvertisementManagement.EndCompra(props.compra._id);
    ChatHelper.sendMessageTo(text, props.compra.buyer_id.username, currentUser);
    ChatHelper.sendMessageTo(
      text2,
      props.compra.buyer_id.username,
      currentUser
    ).then(() => {
      setRequestSent(true);
    });
  };

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (requestSent) {
      timeout = setTimeout(() => {
        navigate("/chatmenu");
      }, 50);
    }
    return () => {
      if (requestSent) {
        clearTimeout(timeout);
      }
    };
  }, [requestSent]);

  return (
    <div className="flex-col space-y-1 rounded-fresh border-[0.8px] border-black pl-2 pr-2 pt-4 pb-4">
      <div className="ml-6 mr-6 flex justify-between">
        <div className="font-space-mono text-[10px] font-normal">
          {"00/00/00"}
        </div>
        <div className="font-space-mono text-[10px] font-normal">
          {props.compra.is_ended ? "FINALIZADA" : "EN MARCHA"}
        </div>
      </div>
      <Divider variant="middle" sx={{ borderStyle: "dashed" }} />
      <div className="ml-6 mr-6 grid grid-cols-4 justify-between space-x-6">
        <div className="col-span-2 font-space-mono text-[14px] font-bold">
          {props.compra.name}
        </div>
        <div className="font-space-mono text-[14px] font-bold">
          {props.compra.quantity} kg
        </div>
        <div className="font-space-mono text-[14px] font-bold">
          {props.compra.price} €
        </div>
      </div>
      {props.compra.is_ended ? (
        <div>
          <Divider variant="middle" sx={{ borderStyle: "dashed" }} />
          <div className="mr-6 ml-6 font-space-mono text-[12px] font-normal">
            Codigo de confirmacion <Link>{props.compra.confirmation_code}</Link>
          </div>
        </div>
      ) : (
        <div>
          <Divider variant="middle" sx={{ borderStyle: "dashed" }} />
          <div className="mr-6 ml-6 mt-4 text-center font-space-mono text-[12px] font-normal">
            <button
              onClick={endVenta}
              className="inline-block h-10 min-h-full w-4/6 rounded-3xl bg-fresh-verde text-base  text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
