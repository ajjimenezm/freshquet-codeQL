import { Button, Avatar, Divider, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import DataUser from './dataUser';
import axios from 'axios';
import React, { useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import ProfilePictureUpload from './ProfilePictureUpload';

interface ProfileProps {
  dataUser: DataUser;
  userRole: string;
  editHandler: () => void;
  avatar?: string;
}

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

function updateData(dataUser: DataUser, afterFunction: () => void) {
  axios
    .put(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/edit`, dataUser, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => {
      afterFunction();
    });
}

function getAvatar(avatar: string | undefined, dataUser: DataUser) {
  return avatar ? (
    <Avatar
      src={avatar}
      sx={{ width: 100, height: 100 }}
      alt={dataUser.username}
    />
  ) : (
    <Avatar {...stringAvatar(dataUser.name)} />
  );
}

const EditProfile = (props: ProfileProps) => {
  const [state, setState] = useState({
    name: props.dataUser.name,
    phone_number: props.dataUser.phone_number,
    email: props.dataUser.email,
    username: props.dataUser.username,
    direction: props.dataUser.direction,
    biography: props.dataUser.biography,
  });

  const handleChange = (e: any) => {
    console.log(e);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  return (
    <div className="m-4 space-y-4">
      <div className="flex space-x-4 py-4">
        {getAvatar(props.avatar, props.dataUser)}
        <div className=" flex-col space-y-4 text-4xl">
          <TextField
            fullWidth
            name="name"
            label="Name"
            onChange={handleChange}
            id="fullWidth"
            defaultValue={props.dataUser.name}
            multiline
          />
          <p className=" text-lg opacity-50">{props.dataUser.username}</p>

          <ProfilePictureUpload
            readAs="DataURL"
            accept="image/*"
            multiple={true}
            limitFilesConfig={{ max: 1 }}
            maxFileSize={5}
            text="Change profile picture"
          />
          <p className=" text-xs opacity-75">Any changes apply on save</p>
        </div>
      </div>
      <Divider />
      <TextField
        fullWidth
        label="Biography"
        id="fullWidth"
        onChange={handleChange}
        name="biography"
        defaultValue={props.dataUser.biography}
        multiline
      />
      <p className=" text-lg  text-emerald-700">
        {props.userRole.toUpperCase()}
      </p>
      <TextField
        fullWidth
        multiline
        name="direction"
        label="Direction"
        id="fullWidth"
        defaultValue={props.dataUser.direction}
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
        defaultValue={props.dataUser.phone_number}
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
        defaultValue={props.dataUser.email}
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
          onClick={() => {
            updateData(state, props.editHandler);
          }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => props.editHandler()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
