import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [state, setState] = useState({
        name: "",
        phone_number: "",
        email: "",
        username: "",
        password: "",
        userType: "",
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
        axios
            .post(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/register`, {
                ...state,
            })
            .then((res) => {
                if (res.status == 201) {
                    localStorage.setItem('userToken', res.data.access_token);
                    navigate("/profile");
                }
            })
            .catch(() => {
                alert("Error creando el usuario");
            });
    };

    return (
        <div className="w-full h-screen bg-zinc-200 flex justify-center items-center">
            <div className="max-w-[400px] md:max-w-[700px] text-center flex justify-center m-4">
                <div className="bg-slate-900/95  rounded-xl p-8 drop-shadow-2xl">
                    <h2 className="text-3xl text-white pb-8 text-bold">Registro</h2>
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="w-full p-2 mr-4 rounded-md mb-4"
                    />
                    <input
                        type="text"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 mr-4 rounded-md mb-4"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        value={state.phone_number}
                        onChange={handleChange}
                        placeholder="Numero de telefono"
                        className="w-full p-2 mr-4 rounded-md mb-4"
                    />
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
                    <div onChange={selectRole} className="grid grid-cols-2">
                        <label>
                            <input
                                type="radio"
                                value="buyer"
                                name="role"
                                className="grow"
                            />
                            <p className="text-white text-xl">Comprador</p>
                        </label>
                        <label>
                            <input type="radio" value="seller" name="role" />
                            <p className="text-white text-xl">Vendedor</p>
                        </label>
                    </div>
                    <button
                        className="px-8 py-3 hover:bg-transparent rounded-md text-white text-2xl"
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