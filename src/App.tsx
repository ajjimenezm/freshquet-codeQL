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
                main: "#00A458",
            },
            secondary: {
                main: "#A4004D",
            },
        },
    });
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<InitialScreen />} />
                    <Route path="*" element={<MainApp />} />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
