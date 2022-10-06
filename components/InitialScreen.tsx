import Link from "next/link";
import styles from "../styles/InitialScreen.module.css";

function InitialScreen() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Freshquet</h1>
            <Link href="/home">
                <button className={styles.startButton}>Start</button>
            </Link>
        </div>
    );
}

export default InitialScreen;
