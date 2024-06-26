import {
  Avatar,
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as HamburgerIcon } from "../../assets/icons/HamburgerIcon.svg";
import { ReactComponent as EstadisticasIcon } from "../../assets/icons/estadisticas.svg";
import EurosAhorrados from "../../assets/illustrations/EurosAhorrados.png";
import CO2Ahorrado from "../../assets/illustrations/CO2Ahorrado.png";

import { User } from "../../types/User";
import { ReactComponent as SmallStar } from "../../assets/icons/SmallStar.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/BackArrow.svg";
import { ReactComponent as FavouriteIcon } from "../../assets/icons/FavouriteIcon.svg";
import { ReactComponent as NotFavouriteIcon } from "../../assets/icons/NotFavouriteIcon.svg";
import { ReactComponent as OpenChatIcon } from "../../assets/icons/OpenChatIcon.svg";

import UserHelper from "../../libs/UserHelper";
import SellerReviews from "./SellerReviews";
import React from "react";
import AdDetailBuyerList from "../advertisements/AdDetailBuyerList";
import Advertisement from "../../types/Advertisement";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import SellerProducts from "./SellerProducts";
import AdSellerCard from "./AdSellerCard";
import AdvertismentHistory from "../advertismentHistory/advertismentHistory";

const createAvatar = (avatar: string, seller: User | undefined) => {
  if (seller && seller?.username && seller?.name) {
    return avatar ? (
      <Avatar
        src={avatar}
        sx={{ width: 75, height: 75 }}
        alt={seller.username}
      />
    ) : (
      <Avatar {...UserHelper.StringAvatar(seller.name)} />
    );
  } else {
    return (
      <Skeleton variant="circular" width={75} height={75} animation={"wave"} />
    );
  }
};

const SellerSelfProfile = () => {
  const navigate = useNavigate();
  const seller_id = localStorage.getItem("userId");
  const [seller, setSeller] = useState<User>();
  const [avatar, setAvatar] = useState<string>();
  const [helpMessage, setHelpMessage] = useState<string>("·");
  const [avgRating, setAvgRating] = useState<number>(-1);
  const [showProductDetail, setShowProductDetail] = React.useState(false);
  const [productToOpen, setProductToOpen] = React.useState(0);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [estadisticas, setEstadisticas] = React.useState(false);
  const [advertisementsToShow, setAdvertisementsToShow] =
    useState<JSX.Element[]>();

  //#region tabs
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  //#endregion

  //#region HamburgerMenu
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

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

  const handleBackButton = () => {
    navigate(-1);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    UserHelper.Logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  function handleListKeyDownHamburgerMenu(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  //#endregion

  useEffect(() => {
    if (!seller) return;

    console.log(seller);
    UserHelper.retrieveProfilePicture(seller.profile_picture).then(
      (res: string) => {
        setAvatar(res);
      }
    );
    AdvertisementManagement.GetNumberOfOrdersFromUser(
      seller._id,
      seller.userType
    ).then((noSells: number) => {
      UserHelper.GetAverageRating(seller._id).then((avgRating: number) => {
        setAvgRating(avgRating);
        setHelpMessage(
          // eslint-disable-next-line no-useless-escape
          `${noSells} ventas · ${
            avgRating === -1 || isNaN(avgRating) ? "Sin reviews" : avgRating
          }`
        );
      });
    });

    AdvertisementManagement.GetAllAdvertisementsFromSeller(seller._id).then(
      (res) => {
        setAdvertisements(res);
      }
    );
  }, [seller]);

  useEffect(() => {
    setAdvertisementsToShow(
      advertisements.map((ad, index) => {
        return (
          <div key={ad._id} className="mb-2">
            <AdSellerCard key={ad._id} advertisement={ad} />
          </div>
        );
      })
    );
  }, [advertisements]);

  useEffect(() => {
    if (!seller_id) {
      alert(
        "Error al cargar el perfil del vendedor. Vuelve a intentarlo más tarde."
      );
      navigate(-1);
      return;
    }
    UserHelper.getUserById(seller_id as string).then((res: User) => {
      setSeller(res);
    });
  }, []);

  const handleToggleEstadisticas = () => {
    setEstadisticas(!estadisticas);
    console.log("estadisticas", estadisticas);
  };

  return (
    <>
      {showProductDetail && (
        <AdDetailBuyerList
          category="Productos"
          products={advertisements}
          onBack={() => {
            setShowProductDetail(false);
          }}
          productToOpen={productToOpen}
        />
      )}
      {!showProductDetail && (
        <div>
          <div>
            <div>
              <div>
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
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                        }}
                      >
                        <Paper className="mr-2">
                          <ClickAwayListener
                            onClickAway={handleCloseHamburgerMenu}
                          >
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
              </div>
              <div></div>
            </div>
          </div>
          <div className="h-screen w-screen flex-col space-y-10 bg-white">
            <div className="flex w-full flex-col items-center justify-center space-y-1 pr-4 pl-4 pt-16">
              {createAvatar(avatar ? avatar : "", seller ? seller : undefined)}
              <div className="font-outfit text-[18px] font-semibold text-fresh-morado">
                {seller ? (
                  seller?.name
                ) : (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      width: 150,
                      height: 20,
                    }}
                  />
                )}
              </div>
              <div className="font-space-mono text-[14px]">
                {seller ? (
                  seller?.direction ? (
                    seller.direction
                  ) : (
                    "Dirección no especificada"
                  )
                ) : (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      width: 200,
                      height: 20,
                    }}
                  />
                )}
              </div>
              <div className="font-space-mono text-[12px]">
                {seller && helpMessage !== "·" ? (
                  <div className="flex flex-row items-center">
                    {helpMessage}
                    {!helpMessage.includes("Sin reviews") ? (
                      <SmallStar className="ml-[2px] h-3 w-3 fill-yellow-300 stroke-gray-500" />
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      width: 200,
                      height: 20,
                    }}
                  />
                )}
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
                      {((advertisements.length * 3) / 2).toFixed(0)} €
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
                      {advertisements.length} kg
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pr-4 pl-4 pb-16">
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth"
                sx={{
                  fontFamily: "Outfit",
                  fontSize: "14px",
                  fontWeight: "semibold",
                }}
                centered
              >
                <Tab
                  label={
                    <span className="text-[14x] font-outfit font-semibold">
                      Productos
                    </span>
                  }
                />
                <Tab
                  label={
                    <span className="text-[14x] font-outfit font-semibold">
                      Reseñas
                    </span>
                  }
                />
                <Tab
                  label={
                    <span className="text-[14x] font-outfit font-semibold">
                      Ventas
                    </span>
                  }
                />
              </Tabs>
              <TabPanel value={currentTab} index={0}>
                <div className=" grid grid-cols-2">{advertisementsToShow}</div>
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <SellerReviews
                  seller_id={seller_id as string}
                  avgRating={avgRating}
                />
              </TabPanel>
              <TabPanel value={currentTab} index={2}>
                <AdvertismentHistory />
              </TabPanel>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerSelfProfile;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
