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
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { User } from '../../types/User';
import { ReactComponent as HamburgerIcon } from '../../assets/icons/HamburgerIcon.svg';

import UserHelper from '../../libs/UserHelper';
import SellerProducts from './SellerProducts';
import SellerReviews from './SellerReviews';

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
      <Skeleton variant="circular" width={75} height={75} animation={'wave'} />
    );
  }
};

const SellerProfile = () => {
  const navigate = useNavigate();
  const { seller_id } = useParams<{ seller_id: string }>();
  const [seller, setSeller] = useState<User>();
  const [avatar, setAvatar] = useState<string>();

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

  function handleListKeyDownHamburgerMenu(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    UserHelper.Logout();
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
  };
  //#endregion

  useEffect(() => {
    if (!seller) return;
    UserHelper.retrieveProfilePicture(seller.profile_picture).then(
      (res: string) => {
        setAvatar(res);
      }
    );
  }, [seller]);

  useEffect(() => {
    if (!seller_id) {
      alert(
        'Error al cargar el perfil del vendedor. Vuelve a intentarlo más tarde.'
      );
      navigate(-1);
      return;
    }
    UserHelper.getUserById(seller_id as string).then((res: User) => {
      console.log(res);
      setSeller(res);
    });
  }, []);

  return (
    <div>
      <div className="h-screen w-screen flex-col space-y-10 bg-white">
        <div className="flex w-full flex-col items-center justify-center space-y-1 pr-4 pl-4 pt-16">
          {createAvatar(avatar ? avatar : '', seller ? seller : undefined)}
          <div className="font-outfit text-[18px] font-semibold text-fresh-morado">
            {seller?.name}
          </div>
          <div className="font-space-mono text-[14px]">
            {seller?.address ? seller.address : 'Dirección no especificada'}
          </div>
        </div>
        <div className="pr-4 pl-4 pb-16">
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              fontFamily: 'Outfit',
              fontSize: '14px',
              fontWeight: 'semibold',
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
          </Tabs>
          <TabPanel value={currentTab} index={0}>
            <SellerProducts seller_id={seller_id as string} />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <SellerReviews />
          </TabPanel>
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

export default SellerProfile;

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
