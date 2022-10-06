import type { NextPage } from "next";
import Head from "next/head";
import BottomNav from "../../components/BottomNav";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Home</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BottomNav value={0} />
        </div>
    );
};

export default Home;
