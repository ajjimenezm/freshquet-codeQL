import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Chat.module.css";

const Chat: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Freshquet - Chat</title>
                <meta name="description" content="Freshquet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
};

export default Chat;
