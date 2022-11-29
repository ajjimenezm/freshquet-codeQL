import React from "react";
import { Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import "./styles/App.css";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import NewProduct from "./components/advertisements/NewProduct";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { AuthContext } from "./chatContext/AuthContext";
import BuyAd from "./components/advertisements/BuyAdvertisement/BuyAdDialog";
import AdvertismentHistory from "./components/advertismentHistory/advertismentHistory";
import NearbyProducts from "./components/Home/NearbyProducts";

function App() {
    const [theme, setTheme] = React.useState<Theme>(
        createTheme({
            palette: {
                primary: {
                    main: "#63d4a1",
                },
            },
        })
    );
    const user = React.useContext(AuthContext);

    if (
        localStorage.getItem("userRole") &&
        localStorage.getItem("userRole") === "seller"
    ) {
        setTheme(
            createTheme({
                palette: {
                    primary: {
                        main: "#976D9C",
                    },
                },
            })
        );
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Routes>
                    {/* <Route path="/" element={<InitialScreen setRole={setRole} />} /> */}
                    <Route path="/" element={<MainApp />} />
                    <Route path="*" element={<MainApp />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="newproduct" element={<NewProduct />} />
                    <Route path="products/buy/:id" element={<BuyAd />} />
                    <Route
                        path="advertismentHistory"
                        element={<AdvertismentHistory />}
                    />
                    <Route path="nearbyProducts" element={<NearbyProducts />} />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
