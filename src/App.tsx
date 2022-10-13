import React from "react";
import { Routes, Route } from "react-router-dom";
import InitialScreen from "./components/InitialScreen";
import MainApp from "./components/MainApp";
import "./styles/App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#63d4a1",
            },
            secondary: {
                main: "#D46496",
            },
        },
    });

    const setRole = (roleName: string) => {
        localStorage.clear();
        localStorage.setItem("role", roleName);
    };

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route
                        path="/"
                        element={<InitialScreen setRole={setRole} />}
                    />
                    <Route path="*" element={<MainApp />} />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
