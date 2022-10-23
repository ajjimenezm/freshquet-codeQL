import { createContext, useEffect, useState, Children} from "react";
import PropTypes from "prop-types";
import {auth} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {User} from "firebase/auth";


export const AuthContext = createContext<any>("");

export const AuthContextProvider = ({children}:{children:any}) => {
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
        setCurrentUser(user);
        } else {
          console.log("No user");
        }
      });
    }, []);

    return(<AuthContext.Provider value={currentUser}> 
              {children}
            </AuthContext.Provider>)
} 