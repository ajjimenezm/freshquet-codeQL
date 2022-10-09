import { Button } from "@mui/material";
import styles from "../styles/InitialScreen.module.css";
import { useNavigate } from "react-router-dom";

function InitialScreen() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Freshquet</h1>
            <Button variant="contained" onClick={() => navigate("/home")}>
                Start
            </Button>
        </div>
    );
}

export default InitialScreen;
