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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import UserHelper from "../../libs/UserHelper";
import { Compra } from "../../types/Compra";
import { User } from "../../types/User";
import OrderCard from "./OrderCard";
import EurosAhorrados from "../../assets/illustrations/EurosAhorrados.png";
import CO2Ahorrado from "../../assets/illustrations/CO2Ahorrado.png";
import { ReactComponent as EstadisticasIcon } from "../../assets/icons/estadisticas.svg";

import { ReactComponent as HamburgerIcon } from "../../assets/icons/HamburgerIcon.svg";
import { useNavigate } from "react-router-dom";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState<string>();
  const [ordersToShow, setOrdersToShow] = useState<JSX.Element[]>();
  const [estadisticas, setEstadisticas] = React.useState(false);

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
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
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
          <OrderCard
            key={order.buyer_id + i}
            date={"0 MES 0000"}
            is_ended={order.is_ended}
            price={order.price}
            quantity={order.quantity}
            productName={order.name}
            sellerUsername={order.seller_id.username}
            sellerAddress={order.seller_id.direction}
            orderID={order._id}
          />
        );
      });
      setOrdersToShow(ordersToShowAux);
    });
  }, [user]);

  const handleToggleEstadisticas = () => {
    setEstadisticas(!estadisticas);
    console.log("estadisticas", estadisticas);
  };

  const createAvatar = () => {
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
          animation={"wave"}
        />
      );
    }
  };

  useEffect(() => {
    UserHelper.getOwnProfile().then((res: User) => {
      setUser(res);
    });
  }, []);

  const handleLogout = () => {
    UserHelper.Logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleSeeLater = () => {
    navigate("/seeLater");
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
            {user?.direction ? user.direction : "Dirección no especificada"}
          </div>
        </div>
        {estadisticas && (
          <div>
            <p className="mb-8 text-center text-[18px] font-bold text-fresh-verde-oscuro">
              Tus estadísticas
            </p>
            <div className="grid grid-cols-2 justify-items-center">
              <div className="flex h-[115px] w-[115px] flex-col items-center justify-center rounded-full bg-fresh-azul-claro">
                <img
                  src={EurosAhorrados}
                  alt="Euros Ahorrados"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
                <p className=" -mt-6 mb-2 text-center text-[14px] font-bold text-fresh-verde-oscuro">
                  {(
                    (ordersToShow?.length ? ordersToShow.length : 0 * 3) / 2
                  ).toFixed(0)}{" "}
                  €
                </p>
              </div>
              <div className="flex h-[115px] w-[115px] flex-col items-center justify-center rounded-full bg-fresh-azul-claro">
                <img
                  src={CO2Ahorrado}
                  alt="CO2 Ahorrado"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
                <p className=" -mt-6 mb-2 text-center text-[14px] font-bold text-fresh-verde-oscuro">
                  {ordersToShow?.length} kg
                </p>
              </div>
            </div>
          </div>
        )}
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
          onClick={handleToggleEstadisticas}
          sx={{
            position: "fixed",
            top: 60,
            right: 20,
            backgroundColor: "white",
            border: "0",
            boxShadow: "none",
          }}
        >
          <EstadisticasIcon />
        </IconButton>
      </div>
      <div>
        <IconButton
          ref={anchorRef}
          onClick={handleToggleHamburgerMenu}
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            backgroundColor: "white",
            border: "0",
            boxShadow: "none",
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
                  placement === "bottom-start" ? "left top" : "left bottom",
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
                      key="qua01"
                      onClick={handleEditProfile}
                      className="font-space-mono text-[14px]"
                    >
                      <div className="font-space-mono text-[14px]">
                        Editar perfil
                      </div>
                    </MenuItem>
                    {/* <MenuItem onClick={handleCloseHamburgerMenu}>Mis estadísticas</MenuItem> */}
                    <MenuItem
                      onClick={handleSeeLater}
                      className="font-space-mono text-[14px]"
                    >
                      <div className="font-space-mono text-[14px]">
                        Ver más tarde
                      </div>
                    </MenuItem>
                    <MenuItem
                      key="qua02"
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
