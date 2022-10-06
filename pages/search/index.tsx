import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Search.module.css";

const Search: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Search</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};

export default Search;
