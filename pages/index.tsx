import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import InitialScreen from "../components/InitialScreen";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Freshquet</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <InitialScreen />
        </div>
    );
};

export default Home;
