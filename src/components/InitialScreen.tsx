import { Button } from "@mui/material";
import styles from "../styles/InitialScreen.module.css";
import { Link } from "react-router-dom";

function InitialScreen() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Freshquet</h1>
            <Link to="/home">
                <Button variant="contained">Start</Button>
            </Link>
        </div>
    );
}

export default InitialScreen;
