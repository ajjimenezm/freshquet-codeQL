import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import DataUser from '../Profile/dataUser';

interface SellerPageState {
  dataUser: DataUser;
}

function SellerPage() {
  const { id } = useParams<{ id: string }>();

  const [state, setState] = React.useState<SellerPageState>({
    dataUser: {
      name: 'Cargando Nombre',
      username: 'cargando',
      phone_number: '123456789',
      email: '',
      biography: 'Cargando...',
      direction: 'Cargando...',
    },
  });

  const fetchSellerData = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        setState({
          dataUser: {
            name: res.data[0].name,
            username: res.data[0].username,
            phone_number: res.data[0].phone_number,
            email: res.data[0].email,
            direction: res.data[0].direction,
            biography: res.data[0].biography,
          },
        });
      });
  };

  const stringAvatar = (name: string) => {
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
  };

  return (
    <div className="m-4 space-y-4">
      <div className="flex space-x-4 py-4">
        <Avatar {...stringAvatar(state.dataUser.name)} />
        <div className=" flex-col space-y-4">
          <h1 className="text-4xl">{state.dataUser.name}</h1>
          <p className=" text-lg opacity-50">{state.dataUser.username}</p>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
