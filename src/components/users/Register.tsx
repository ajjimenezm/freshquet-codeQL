import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Photo from "./logoFreshquet.jpeg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { signInWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    phone_number: 0,
    email: "",
    username: "",
    password: "",
    userType: "",
    repeat_password: "",
    direction: "Default direction",
    biography: "New to freshquet :)",
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
    if (state.name.length === 0) {
      alert("Inserte un nombre de usuario válido");
      return;
    }
    const regexMail = "^.*@.+$";
    if (state.email.length === 0 || state.email.match(regexMail) === null) {
      alert("Inserte un email válido");
      return;
    }
    if (state.phone_number.toString().length === 0) {
      alert("Inserte un número de teléfono válido");
      return;
    }
    if (state.username.length === 0) {
      alert("Inserte un nombre de usuario válido");
      return;
    }
    if (state.password !== state.repeat_password) {
      alert("Las contraseñas no coinciden");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/register`, {
        ...state,
      })
      .then((res) => {
        if (res.status == 201) {
          if (res.status == 201) {
            localStorage.setItem("userToken", res.data.access_token);
            localStorage.setItem("userId", res.data.userId);
            navigate("/home");
          }
        }
      })
      .catch((res) => {
        alert(res.response.data.error);
      });
  };

  const registerChat = async () => {
    const email = state.email;
    const password = state.password;
    const displayName = state.username;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const username = await updateProfile(res.user, {
      displayName: displayName,
    });

    const user = await signInWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      displayName,
      email,
    });

    await setDoc(doc(db, "userChats", res.user.uid), {});
  };

  const registerProcess = () => {
    sendRegister();
    registerChat();
  };

  return (
    <section className="items-center bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <img className="mb-4 h-20 w-20" src={Photo} alt="" />
        <div className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0 ">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Iniciar sesión
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 ">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                  placeholder="Nombre Apellido"
                  value={state.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 ">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                  placeholder="name@company.com"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 ">
                  Número de teléfono
                </label>
                <input
                  type="number"
                  name="phone_number"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                  placeholder="612345678"
                  value={state.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 ">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="username"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
                  placeholder="nombre54"
                  value={state.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 ">
                  Constraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className=" mb-2 block text-sm font-medium text-gray-900 ">
                  Repetir constraseña
                </label>
                <input
                  type="password"
                  name="repeat_password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  value={state.repeat_password}
                  onChange={handleChange}
                />
              </div>
              <Box className=" mb-2 block text-sm font-medium text-gray-900">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de usuario
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="userType"
                    value={state.userType}
                    label="Tipo de usuario"
                    onChange={selectRole}
                  >
                    <MenuItem value="buyer">Comprador</MenuItem>
                    <MenuItem value="seller">Vendedor</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <button
                className="focus:ring-primary-300 w-full rounded-lg bg-emerald-300 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-200 focus:outline-none focus:ring-4 "
                onClick={registerProcess}
              >
                Regístrate
              </button>
            </div>
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
