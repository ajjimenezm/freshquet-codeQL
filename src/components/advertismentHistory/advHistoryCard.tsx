import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Advertisement from '../../types/Advertisement';
import AdvertisementManagement from '../../libs/AdvertisementManagement';
import { Button } from '@mui/material';
import React from 'react';
import ChatHelper from '../../libs/ChatHelper';
import { AuthContext } from '../../chatContext/AuthContext';

interface advHistoryCardProps {
  compra_id: string;
  adv_id: string;
  buyer_id: string;
  quantity: number;
  is_ended: boolean;
  price: number;
}

function AdvHistoryCard(props: advHistoryCardProps) {
  const [advertisement, setAdv] = useState<Advertisement>();
  const [buyerName, setBuyerName] = useState<string>('');
  const [sellerName, setSellerName] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const currentUser = React.useContext(AuthContext);

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${props.buyer_id}/name`,
      headers: {},
    };

    axios(config).then(function (response) {
      setBuyerName(response.data);
    });

    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        setSellerName(res.data[0].name);
      });

    const config2 = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${props.adv_id}`,
      headers: {},
    };

    axios(config2).then(function (response) {
      setAdv(response.data);
    });
  }, []);

  useEffect(() => {
    AdvertisementManagement.GetImageAdvertisment(props.adv_id).then((res) => {
      setImage(res);
    });
  }, []);

  const confirmPurchase = () => {
    const config = {
      method: 'put',
      url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/${props.compra_id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      data: {
        is_ended: true,
      },
    };

    const config2 = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/${props.compra_id}/confirmation_code`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    };

    axios(config2).then(function (response) {
      const message =
        'El vendedor ha confirmado la compra. Código de confirmación: ' +
        response.data;

      axios(config).then(function (response) {
        if (response.status === 200) {
          console.log('Compra confirmada');
          ChatHelper.sendMessageTo(sellerName, message, currentUser);
        }
      });
    });
  };

  // const getConfirmationCode = () => {
  //   const config = {
  //     method: 'get',
  //     url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/${props.compra_id}/confirmation_code`,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  //     },
  //   };

  //   axios(config).then(function (response) {
  //     return response.data;
  //   });
  // };

  return (
    <div className="h-25 mt-1 mb-1 flex flex-row items-center space-x-3">
      <img
        src={image}
        alt={advertisement?.name}
        className="aspect-square w-32 rounded-lg border-2 object-cover object-center"
      />

      <div className=" flex h-36 w-32 flex-col items-start justify-evenly pt-3 pb-3">
        <div className="text-lg font-normal">{advertisement?.name}</div>
        <div className="text-sm">Comprado por:</div>
        <div>{buyerName}</div>
        <div className="font-light">
          {props.price} €
          <br />
          {props.quantity} kg
        </div>
        <div>
          {props.is_ended ? <div>Finalizada</div> : <div>En tramite</div>}
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => confirmPurchase()}
          disabled={props.is_ended}
        >
          Confirmar venta
        </Button>
      </div>
    </div>
  );
}
export default AdvHistoryCard;
