import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [state, setState] = useState({
    name: '',
    phone_number: '',
    email: '',
    username: '',
    password: '',
    userType: '',
    repeat_password: '',
    direction: 'Default direction',
    biography: 'New to freshquet :)',
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const selectRole = (e: any) => {
    setState({
      ...state,
      userType: e.target.value,
    });
  };

  const sendRegister = () => {
    if (state.password !== state.repeat_password) {
      alert('Las contraseñas no coinciden');
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/register`, {
        ...state,
      })
      .then((res) => {
        if (res.status == 201) {
          localStorage.setItem('userToken', res.data.access_token);
          navigate('/home');
        }
      })
      .catch(() => {
        alert('Error creando el usuario');
      });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-200">
      <div className="m-4 flex max-w-[400px] justify-center text-center md:max-w-[700px]">
        <div className="rounded-xl  bg-slate-900/95 p-8 drop-shadow-2xl">
          <h2 className="text-bold pb-8 text-3xl text-white">Registro</h2>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="mr-4 mb-4 w-full rounded-md p-2"
          />
          <input
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            className="mr-4 mb-4 w-full rounded-md p-2"
          />
          <input
            type="text"
            name="phone_number"
            value={state.phone_number}
            onChange={handleChange}
            placeholder="Numero de telefono"
            className="mr-4 mb-4 w-full rounded-md p-2"
          />
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            className="mr-4 mb-4 w-full rounded-md p-2"
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="mr-4 mb-4 w-full rounded-md p-2"
          />
          <input
            type="password"
            name="repeat_password"
            value={state.repeat_password}
            onChange={handleChange}
            placeholder="Repite la Contraseña"
            className="mr-4 mb-4 w-full rounded-md p-2"
          />
          <div onChange={selectRole} className="grid grid-cols-2">
            <label>
              <input type="radio" value="buyer" name="role" className="grow" />
              <p className="text-xl text-white">Comprador</p>
            </label>
            <label>
              <input type="radio" value="seller" name="role" />
              <p className="text-xl text-white">Vendedor</p>
            </label>
          </div>
          <button
            className="rounded-md px-8 py-3 text-2xl text-white hover:bg-transparent"
            onClick={sendRegister}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
