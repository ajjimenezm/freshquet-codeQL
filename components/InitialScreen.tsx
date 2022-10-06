import styles from "../styles/InitialScreen.module.css";

function InitialScreen() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Freshquet</h1>
            <button className={styles.startButton}>Start</button>
        </div>
    );
}

export default InitialScreen;
