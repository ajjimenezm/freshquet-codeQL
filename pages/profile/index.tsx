import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Profile.module.css";

const Profile: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Profile</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};

export default Profile;
