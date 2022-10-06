import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Profile.module.css";
import BottomNav from "../../components/BottomNav";

const Profile: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Profile</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BottomNav value={4} />
        </div>
    );
};

export default Profile;
