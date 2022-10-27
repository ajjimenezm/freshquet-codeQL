import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  const sendLogin = () => {
    console.log(process.env.REACT_APP_BACKEND_DEFAULT_ROUTE);
    axios
      .post(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/login`, {
        ...state,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          localStorage.setItem("userToken", res.data.access_token);
          localStorage.setItem("userId", res.data.userId);
          navigate("/home");
        }
      })
      .catch((res) => {
        console.log(res);
        alert("Usuario o pass incorrectos");
      });
  };

  const loginChat = async () => {
    const email = state.username;
    const password = state.password;
    try{
      const user = await signInWithEmailAndPassword(auth, email, password);
    }
    catch(err){
      setErr(true);
    }  
  };

  const loginProcess = () => {
    sendLogin();
    loginChat();
}

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-200">
      <div className="m-4 flex max-w-[400px] justify-center text-center md:max-w-[700px]">
        <div className="rounded-xl  bg-slate-900/95 p-8 drop-shadow-2xl">
          <h2 className="text-bold pb-8 text-3xl text-white">Iniciar Sesión</h2>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            placeholder="Email"
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
          <button
            className="rounded-md px-8 py-3 text-2xl text-white hover:bg-transparent hover:text-3xl"
            onClick={loginProcess}
          >
            Iniciar Sesión
          </button>
          <button
            className="rounded-md px-8 py-3 text-xl text-white hover:bg-transparent"
            onClick={navigateRegister}
          >
            O Registrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
