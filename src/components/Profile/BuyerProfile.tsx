import { Avatar, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import UserHelper from '../../libs/UserHelper';
import { User } from '../../types/User';

const BuyerProfile = () => {
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState<string>();

  const fetchData = () => {
    UserHelper.getOwnProfile().then((res: User) => {
      setUser(res);

      UserHelper.retrieveProfilePicture(res.profilePicture).then(
        (res: string) => {
          setAvatar(res);
        }
      );
    });
  };

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: '#63d4a1',
        width: 100,
        height: 100,
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
    if (!username || !name) {
      return avatar ? (
        <Avatar
          src={avatar}
          sx={{ width: 100, height: 100 }}
          alt={username as string}
        />
      ) : (
        <Avatar {...stringAvatar(name as string)} />
      );
    } else {
      return (
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation={'wave'}
        />
      );
    }
  };

  fetchData();

  return (
    <div>
      <div>
        {createAvatar(avatar, user?.username, user?.name)}
        <Typography variant="h4">{user?.name}</Typography>
        <Typography variant="h6">{user?.address}</Typography>
      </div>
      <div>
        <Typography variant="h6">Mis Pedidos</Typography>
      </div>
    </div>
  );
};

export default BuyerProfile;
