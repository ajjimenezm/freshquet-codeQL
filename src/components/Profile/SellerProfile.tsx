import { Avatar, Skeleton, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Link,
  matchPath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { User } from '../../types/User';

import UserHelper from '../../libs/UserHelper';
import SellerProducts from './SellerProducts';

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
          <div className="font-outfit text-[18px] font-semibold">
            {seller?.name}
          </div>
          <div className="font-space-mono text-[14px]">
            {seller?.address ? seller.address : 'Dirección no especificada'}
          </div>
        </div>
        <div className="pr-4 pl-4 pb-16">
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <LinkTab label="Productos" href="/asas" />
            <LinkTab label="Reseñas" href="/reviews" />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
