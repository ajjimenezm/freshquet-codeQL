import { Avatar, Fab, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdvertisementManagement from '../../libs/AdvertisementManagement';
import UserHelper from '../../libs/UserHelper';
import { Compra } from '../../types/Compra';
import { User } from '../../types/User';
import OrderCard from './OrderCard';

import { ReactComponent as HamburgerIcon } from '../../assets/icons/HamburgerIcon.svg';

const BuyerProfile = () => {
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState<string>();
  const [ordersToShow, setOrdersToShow] = useState<JSX.Element[]>();

  React.useEffect(() => {
    if (!user) return;
    UserHelper.retrieveProfilePicture(user.profilePicture).then(
      (res: string) => {
        console.log(res);
        setAvatar(res);
      }
    );
    AdvertisementManagement.GetOrdersFromUser(
      (user as User)._id,
      (user as User).userType
    ).then((res: Compra[]) => {
      console.log(res);
      const ordersToShowAux: JSX.Element[] = [];
      let i = 0;
      let productNameAux, sellerNameAux, sellerAddressaux;
      res.forEach((order) => {
        ordersToShowAux.push(
          <div>
            <OrderCard
              date={'0 MES 0000'}
              is_ended={order.is_ended}
              price={order.price}
              quantity={order.quantity}
              key={++i}
              productName={order.adv_id.name}
              sellerUsername={order.seller_id.username}
              sellerAddress={order.seller_id.direction}
            />
          </div>
        );
      });
      setOrdersToShow(ordersToShowAux);
    });
  }, [user]);

  const fetchData = () => {
    UserHelper.getOwnProfile().then((res: User) => {
      console.log(res);
      setUser(res);
    });
  };

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: '#63d4a1',
        width: 75,
        height: 75,
        fontSize: 45,
        fontWeight: 'bold',
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const createAvatar = (
    avatar: string | undefined,
    username: string | undefined,
    name: string | undefined
  ) => {
    if (username && name) {
      return avatar ? (
        <Avatar
          src={avatar}
          sx={{ width: 75, height: 75 }}
          alt={username as string}
        />
      ) : (
        <Avatar {...stringAvatar(name as string)} />
      );
    } else {
      return (
        <Skeleton
          variant="circular"
          width={75}
          height={75}
          animation={'wave'}
        />
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="h-screen w-screen flex-col space-y-10 bg-white">
        <div className="flex w-full flex-col items-center justify-center space-y-1 pr-4 pl-4 pt-16">
          {createAvatar(avatar, user?.username, user?.name)}
          <div className="font-outfit text-[18px] font-semibold">
            {user?.name}
          </div>
          <div className="font-space-mono text-[14px]">
            {user?.address ? user.address : 'Dirección no especificada'}
          </div>
        </div>
        <div className="pr-4 pl-4 pb-16">
          <div className="font-outfit text-[18px] font-semibold">
            Mis Pedidos
          </div>
          <div className="mt-4 mb-4 space-y-4">{ordersToShow}</div>
        </div>

        <Fab
          sx={{
            position: 'fixed',
            top: -20,
            right: 20,
            backgroundColor: 'white',
            border: '0',
            boxShadow: 'none',
          }}
          onClick={() => console.log('hamburger')}
        >
          <HamburgerIcon />
        </Fab>
      </div>
    </div>
  );
};

export default BuyerProfile;
