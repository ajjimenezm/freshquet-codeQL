import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Chat.module.css";
import BottomNav from "../../components/BottomNav";

const Chat: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Chat</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BottomNav value={3} />
        </div>
    );
};

export default Chat;
