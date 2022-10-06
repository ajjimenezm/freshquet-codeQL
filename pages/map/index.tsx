import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Map.module.css";
import BottomNav from "../../components/BottomNav";

const Map: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Map</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BottomNav value={2} />
        </div>
    );
};

export default Map;
