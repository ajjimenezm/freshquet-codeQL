import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import {db} from "../../firebase";
import Photo from "./logoFreshquet.jpeg";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
          if (res.status == 201) {
            localStorage.setItem('userToken', res.data.access_token);
            localStorage.setItem('userId', res.data.userId);
            navigate('/home');
  }        }
      })
      .catch(() => {
        alert('Error creando el usuario');
      });
  };

    const registerChat = async () => {
        const email = state.email;
        const password = state.password;
        const name = state.username;
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const username = await updateProfile(res.user, {
            displayName: name
        })

        await setDoc(doc(db, "users", res.user.uid), {
            name,
            email
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});
    };

    const registerProcess = () => {
        sendRegister();
        registerChat();
    }

  return (
    <section className="bg-gray-50 items-center">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <img className="w-20 h-20 mb-4" src={Photo} alt=""/>  
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Iniciar sesión
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                    <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Nombre Apellido" value={state.name} onChange={handleChange}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" value={state.email} onChange={handleChange}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Número de teléfono</label>
                    <input type="text" name="phone_number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="612345678" value={state.phone_number} onChange={handleChange}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Nombre de usuario</label>
                    <input type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="nombre54" value={state.username} onChange={handleChange}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Constraseña</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={state.password} onChange={handleChange}/>
                </div>
                <div>
                    <label className=" block mb-2 text-sm font-medium text-gray-900 ">Repetir constraseña</label>
                    <input type="password" name="repeat_password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={state.repeat_password} onChange={handleChange}/>
                </div>
                <Box className=" block mb-2 text-sm font-medium text-gray-900">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name='userType'
                      value={state.userType}
                      label="Tipo de usuario"
                      onChange={handleChange}
                    >
                      <MenuItem value="buyer">Comprador</MenuItem>
                      <MenuItem value="seller">Vendedor</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>
                  <button type="submit" className="w-full text-white bg-emerald-300 hover:bg-emerald-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Regístrate</button>
            </form>
        </div>
    </div>
</div>
</section>

    // <div className="flex h-screen w-full items-center justify-center bg-zinc-200">
    //   <div className="m-4 flex max-w-[400px] justify-center text-center md:max-w-[700px]">
    //     <div className="rounded-xl  bg-slate-900/95 p-8 drop-shadow-2xl">
    //       <h2 className="text-bold pb-8 text-3xl text-white">Registro</h2>
    //       <input
    //         type="text"
    //         name="name"
    //         value={state.name}
    //         onChange={handleChange}
    //         placeholder="Nombre"
    //         className="mr-4 mb-4 w-full rounded-md p-2"
    //       />
    //       <input
    //         type="text"
    //         name="email"
    //         value={state.email}
    //         onChange={handleChange}
    //         placeholder="Email"
    //         className="mr-4 mb-4 w-full rounded-md p-2"
    //       />
    //       <input
    //         type="text"
    //         name="phone_number"
    //         value={state.phone_number}
    //         onChange={handleChange}
    //         placeholder="Numero de telefono"
    //         className="mr-4 mb-4 w-full rounded-md p-2"
    //       />
    //       <input
    //         type="text"
    //         name="username"
    //         value={state.username}
    //         onChange={handleChange}
    //         placeholder="Nombre de usuario"
    //         className="mr-4 mb-4 w-full rounded-md p-2"
    //       />
    //       <input
    //         type="password"
    //         name="password"
    //         value={state.password}
    //         onChange={handleChange}
    //         placeholder="Contraseña"
    //         className="mr-4 mb-4 w-full rounded-md p-2"
    //       />
    //       <input
    //         type="password"
    //         name="repeat_password"
    //         value={state.repeat_password}
    //         onChange={handleChange}
    //         placeholder="Repite la Contraseña"
    //         className="mr-4 mb-4 w-full rounded-md p-2"
    //       />
          // <div onChange={selectRole} className="grid grid-cols-2">
          //   <label>
          //     <input type="radio" value="buyer" name="role" className="grow" />
          //     <p className="text-xl text-white">Comprador</p>
          //   </label>
          //   <label>
          //     <input type="radio" value="seller" name="role" />
          //     <p className="text-xl text-white">Vendedor</p>
          //   </label>
          // </div>
    //       <button
    //         className="rounded-md px-8 py-3 text-2xl text-white hover:bg-transparent"
    //         onClick={registerProcess}
    //       >
    //         Registrarse
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Register;
