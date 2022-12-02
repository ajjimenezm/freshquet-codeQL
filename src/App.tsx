import React from "react";
import { Routes, Route } from "react-router-dom";
import MainApp from "./components/MainApp";
import "./styles/App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import BuyAd from "./components/advertisements/BuyAdvertisement/BuyAdDialog";
import AdvertismentHistory from "./components/advertismentHistory/advertismentHistory";
import { AuthContext } from "./chatContext/AuthContext";

function App() {
  const user = React.useContext(AuthContext);
  console.log(user);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#63d4a1",
      },
      secondary: {
        main: "#976D9C",
      },
    },
  });
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Routes>
                    {/* <Route path="/" element={<InitialScreen setRole={setRole} />} /> */}
                    <Route path="/" element={<MainApp />} />
                    <Route path="*" element={<MainApp />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="products/buy/:id" element={<BuyAd />} />
                    <Route
                        path="advertismentHistory"
                        element={<AdvertismentHistory />}
                    />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
