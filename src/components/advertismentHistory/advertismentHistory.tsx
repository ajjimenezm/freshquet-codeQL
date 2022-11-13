import Heading from '../Heading';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdvHistoryCard from './advHistoryCard';

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
  const [userId, setUserId] = React.useState<string>();

  const navigate = useNavigate();

  React.useEffect(() => {
    const user = localStorage.getItem('userToken');
    if (!user) {
      navigate('/login');
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        setUserRole(res.data.userRole);
        const config = {
          method: 'get',
          url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/all/${res.data.userId}`,
          headers: {},
        };

        axios(config).then(function (response: any) {
          console.log(response.data);
          if (response.status === 200) {
            setAdvertisements(response.data);
            setDataLoaded(true);
          }
        });
      });
  }, []);

  React.useEffect(() => {
    console.log(advertisements);
  }, [advertisements]);

  React.useEffect(() => {
    setAdvertisementsToShow(
      advertisements.map((ad: ICompra) => {
        console.log('ad:', ad);
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
      })
    );
  }, [dataLoaded]);

  return (
    <div>
      <Heading text="Tus ventas" />

      <div className="mb-16 ml-5 mr-5 space-y-3 divide-y-2">
        {advertisementsToShow}
      </div>
    </div>
  );
};

export default AdvertismentHistory;
