import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import Photo from "./logoFreshquet.jpeg";

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
    <section className="bg-gray-50 items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img className="w-20 h-20 mb-4" src={Photo} alt=""/>  
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Iniciar sesión
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                    <input type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" value={state.username} onChange={handleChange}/>
                  </div>
                  <div>
                      <label className="passwordInput block mb-2 text-sm font-medium text-gray-900 ">Contraseña</label>
                      <input type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={state.password} onChange={handleChange}/>
                  </div>
                  <div className="flex items-center justify-between">
                  </div>
                  <button className="w-full text-white bg-emerald-300 hover:bg-emerald-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={loginProcess}>Iniciar sesión</button>
                  <p className="text-sm font-light text-black ">
                      ¿Aún no tienes cuenta? <a href="#" className="font-medium text-emerald-300 hover:underline " onClick={navigateRegister}>¡Regístrate!</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    
    
    // <div classNameName="flex h-screen w-full items-center justify-center bg-zinc-200">
    //   <div classNameName="m-4 flex max-w-[400px] justify-center text-center md:max-w-[700px]">
    //     <div classNameName="rounded-xl  bg-slate-900/95 p-8 drop-shadow-2xl">
    //       <h2 classNameName="text-bold pb-8 text-3xl text-white">Iniciar Sesión</h2>
    //       <input
    //         type="text"
    //         name="username"
    //         value={state.username}
    //         onChange={handleChange}
    //         placeholder="Email"
    //         classNameName="mr-4 mb-4 w-full rounded-md p-2"
    //       />
    //       <input
    //         type="password"
    //         name="password"
    //         value={state.password}
    //         onChange={handleChange}
    //         placeholder="Contraseña"
    //         classNameName="mr-4 mb-4 w-full rounded-md p-2"
    //       />
    //       <button
    //         classNameName="rounded-md px-8 py-3 text-2xl text-white hover:bg-transparent hover:text-3xl"
    //         onClick={loginProcess}
    //       >
    //         Iniciar Sesión
    //       </button>
    //       <button
    //         classNameName="rounded-md px-8 py-3 text-xl text-white hover:bg-transparent"
    //         onClick={navigateRegister}
    //       >
    //         O Registrate
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
