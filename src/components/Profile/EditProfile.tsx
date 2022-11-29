import { Button, Avatar, Divider, TextField, Skeleton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import React, { useState } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload';
import UserHelper from '../../libs/UserHelper';
import { useNavigate } from 'react-router-dom';
import { User, UserEdit } from '../../types/User';

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState<string>();
  const [loaded, setLoaded] = useState(false);

  const [state, setState] = useState<UserEdit>();

  const handleChange = (e: any) => {
    console.log(e);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const handleSave = () => {
    const userAux: User = {
      _id: state?._id ? state._id : (user as User)._id,
      name: state?.name ? state.name : (user as User).name,
      username: state?.username ? state.username : (user as User).username,
      password: state?.password ? state.password : (user as User).password,
      phoneNumber: state?.phoneNumber
        ? state.phoneNumber
        : (user as User).phoneNumber,
      email: state?.email ? state.email : (user as User).email,
      profile_picture: state?.profile_picture
        ? state.profile_picture
        : (user as User).profile_picture,
      address: state?.address ? state.address : (user as User).address,
      biography: state?.biography ? state.biography : (user as User).biography,
      latitude: state?.latitude ? state.latitude : (user as User).latitude,
      longitude: state?.longitude ? state.longitude : (user as User).longitude,
      userType: (user as User).userType,
    };
    UserHelper.UpdateUserData(userAux).then(() => {
      alert('Datos actualizados');
      navigate('/profile');
    });
  };

  const createAvatar = () => {
    console.log(avatar);
    if (loaded && user?.username && user?.name) {
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

  React.useEffect(() => {
    console.log(user);
    if (user) {
      setLoaded(true);
      setState({
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        username: user.username,
        address: user.address,
        biography: user.biography,
      });

      UserHelper.retrieveProfilePicture(user.profile_picture).then(
        (res: string) => {
          setAvatar(res);
        }
      );
    }
  }, [user]);

  React.useEffect(() => {
    UserHelper.getOwnProfile().then((res: User) => {
      setUser(res);
    });
  }, []);

  return loaded ? (
    <div className="m-4 space-y-4">
      <div className="flex space-x-4 py-4">
        {createAvatar()}
        <div className=" flex-col space-y-4 text-4xl">
          <TextField
            fullWidth
            name="name"
            label="Name"
            onChange={handleChange}
            id="fullWidth"
            defaultValue={user?.name}
            multiline
          />
          <p className="font-space-mono text-[18px] ">{user?.username}</p>

          <ProfilePictureUpload
            readAs="DataURL"
            accept="image/*"
            multiple={true}
            limitFilesConfig={{ max: 1 }}
            maxFileSize={3}
            text="Change profile picture"
          />
          <p className="font-space-mono text-[12px] font-normal">
            Any changes apply on save
          </p>
        </div>
      </div>
      <Divider />
      <TextField
        fullWidth
        label="Biography"
        id="fullWidth"
        onChange={handleChange}
        name="biography"
        defaultValue={user?.biography}
        multiline
      />
      <p className="font-outfit text-[18px] font-semibold">
        {user?.userType.toUpperCase()}
      </p>
      <TextField
        fullWidth
        multiline
        name="direction"
        label="Direction"
        id="fullWidth"
        defaultValue={user?.address}
        size="small"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        multiline
        label="Phone number"
        id="fullWidth"
        name="phone_number"
        defaultValue={user?.phoneNumber}
        size="small"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CallIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        multiline
        label="Email"
        name="email"
        id="fullWidth"
        defaultValue={user?.email}
        size="small"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <Divider />
      <div className=" space-x-10 text-right">
        <Button
          variant="outlined"
          color="success"
          onClick={handleSave}
          disabled={!loaded}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate('/profile')}
        >
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <div className="m-4 space-y-4">
      <div className="flex space-x-4 py-4">
        <Skeleton
          variant="circular"
          width={75}
          height={75}
          animation={'wave'}
        />
        <div className=" flex-col space-y-4 text-4xl">
          <Skeleton variant="text" width={200} height={75} animation={'wave'} />
          <Skeleton variant="text" width={200} height={75} animation={'wave'} />
          <Skeleton variant="text" width={200} height={75} animation={'wave'} />
          <Skeleton variant="text" width={200} height={75} animation={'wave'} />
        </div>
      </div>
      <Divider />
      <Skeleton variant="text" width={200} height={75} animation={'wave'} />
      <Skeleton variant="text" width={200} height={75} animation={'wave'} />
      <Skeleton variant="text" width={200} height={75} animation={'wave'} />
      <Skeleton variant="text" width={200} height={75} animation={'wave'} />
      <Skeleton variant="text" width={200} height={75} animation={'wave'} />
      <Divider />
      <div className=" space-x-10 text-right">
        <Skeleton variant="text" width={200} height={75} animation={'wave'} />
        <Skeleton variant="text" width={200} height={75} animation={'wave'} />
      </div>
    </div>
  );
};

export default EditProfile;
