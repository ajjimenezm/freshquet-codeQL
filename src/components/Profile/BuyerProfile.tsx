import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdvertisementManagement from '../../libs/AdvertisementManagement';
import UserHelper from '../../libs/UserHelper';
import { Compra } from '../../types/Compra';
import { User } from '../../types/User';
import OrderCard from './OrderCard';

import { ReactComponent as HamburgerIcon } from '../../assets/icons/HamburgerIcon.svg';
import { useNavigate } from 'react-router-dom';
import { log } from 'console';

const BuyerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState<string>();
  const [ordersToShow, setOrdersToShow] = useState<JSX.Element[]>();

  //#region HamburgerMenu

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggleHamburgerMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseHamburgerMenu = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDownHamburgerMenu(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //#endregion

  React.useEffect(() => {
    console.log('set avatar: ');
    console.log(avatar);
  }, [avatar]);

  React.useEffect(() => {
    console.log('set user');
    console.log(user);

    if (!user) return;
    UserHelper.retrieveProfilePicture(user.profile_picture).then(
      (res: string) => {
        setAvatar(res);
      }
    );
    AdvertisementManagement.GetOrdersFromUser(
      (user as User)._id,
      (user as User).userType
    ).then((res: Compra[]) => {
      const ordersToShowAux: JSX.Element[] = [];
      let i = -1;
      res.forEach((order) => {
        i++;
        ordersToShowAux.push(
          <div>
            <OrderCard
              date={'0 MES 0000'}
              is_ended={order.is_ended}
              price={order.price}
              quantity={order.quantity}
              key={i}
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

  const createAvatar = () => {
    console.log(avatar);
    if (user?.username && user?.name) {
      return avatar ? (
        <Avatar
          src={avatar}
          sx={{ width: 75, height: 75 }}
          alt={user.username}
        />
      ) : (
        <Avatar {...UserHelper.StringAvatar(user.name)} />
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
    UserHelper.getOwnProfile().then((res: User) => {
      console.log(res);
      setUser(res);
    });
  }, []);

  const handleLogout = () => {
    UserHelper.Logout();
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  return (
    <div>
      {/* <Observer update={fetchData} /> */}
      <div className="h-screen w-screen flex-col space-y-10 bg-white">
        <div className="flex w-full flex-col items-center justify-center space-y-1 pr-4 pl-4 pt-16">
          {createAvatar()}
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
      </div>
      <div>
        <IconButton
          ref={anchorRef}
          onClick={handleToggleHamburgerMenu}
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            backgroundColor: 'white',
            border: '0',
            boxShadow: 'none',
          }}
        >
          <HamburgerIcon />
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper className="mr-2">
                <ClickAwayListener onClickAway={handleCloseHamburgerMenu}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDownHamburgerMenu}
                  >
                    <MenuItem
                      onClick={handleEditProfile}
                      className="font-space-mono text-[14px]"
                    >
                      <div className="font-space-mono text-[14px]">
                        Editar perfil
                      </div>
                    </MenuItem>
                    {/* <MenuItem onClick={handleCloseHamburgerMenu}>Mis estadísticas</MenuItem> */}
                    <MenuItem
                      onClick={handleLogout}
                      className="font-space-mono text-[14px]"
                    >
                      <div className="font-space-mono text-[14px]">
                        Cerrar sesión
                      </div>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

function Observer(props: { update: any }) {
  useEffect(() => {
    props.update();
  }, []);
  return null;
}

export default BuyerProfile;
