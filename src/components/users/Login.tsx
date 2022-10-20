import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const navigateRegister = () => {
        navigate('/register');
    }

    const sendLogin = () => {
        console.log(process.env.REACT_APP_BACKEND_DEFAULT_ROUTE)
        axios
            .post(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/login`, {
                ...state,
            })
            .then((res) => {
                console.log(res);
                if (res.status == 201) {
                    localStorage.setItem('userToken', res.data.access_token);
                    navigate("/profile");
                }
            })
            .catch((res) => {
                console.log(res)
                alert("Usuario o pass incorrectos");
            });
    };

    return (
        <div className="w-full h-screen bg-zinc-200 flex justify-center items-center">
            <div className="max-w-[400px] md:max-w-[700px] text-center flex justify-center m-4">
                <div className="bg-slate-900/95  rounded-xl p-8 drop-shadow-2xl">
                    <h2 className="text-3xl text-white pb-8 text-bold">Iniciar Sesión</h2>
                    <input
                        type="text"
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                        placeholder="Nombre de usuario"
                        className="w-full p-2 mr-4 rounded-md mb-4"
                    />
                    <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        className="w-full p-2 mr-4 rounded-md mb-4"
                    />
                    <button
                        className="px-8 py-3 hover:bg-transparent hover:text-3xl rounded-md text-white text-2xl"
                        onClick={sendLogin}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        className="px-8 py-3 hover:bg-transparent rounded-md text-white text-xl"
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