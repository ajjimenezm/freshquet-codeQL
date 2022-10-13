import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import styles from "../styles/InitialScreen.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";

interface InitialScreenProps {
    setRole: (role: string) => void;
}

function InitialScreen(props: InitialScreenProps) {
    const navigate = useNavigate();
    const [userType, setUserType] = React.useState("buyer");
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>freshquet</h1>
            <RadioGroup defaultValue="buyer">
                <FormControlLabel
                    value="buyer"
                    control={<Radio />}
                    label="Comprador"
                    onChange={() => setUserType("buyer")}
                />
                <FormControlLabel
                    value="seller"
                    control={<Radio />}
                    label="Vendedor"
                    onChange={() => setUserType("seller")}
                />
            </RadioGroup>

            <Button
                variant="contained"
                onClick={() => {
                    props.setRole(userType);
                    navigate("/home");
                }}
            >
                Start
            </Button>
        </div>
    );
}

export default InitialScreen;
