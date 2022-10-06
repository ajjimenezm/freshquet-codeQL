import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Search.module.css";
import BottomNav from "../../components/BottomNav";

const Search: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Search</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BottomNav value={1} />
        </div>
    );
};

export default Search;
