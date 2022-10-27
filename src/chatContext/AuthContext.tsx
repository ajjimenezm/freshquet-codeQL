import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export const AuthContext = createContext<User | null | undefined>(null);

export const AuthContextProvider = ({
    children,
}: {
    children: ReactJSXElement;
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                console.log("No user");
            }
        });
        return () => { unsub(); };
    }, []);

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};
