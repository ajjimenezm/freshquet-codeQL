/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { createContext } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { AuthContext } from "../chatContext/AuthContext";

export const UserContext = createContext<any>(null);

export const UserContextProvider = ({
  children,
}: {
  children: ReactJSXElement;
}) => {
  const currentUser = React.useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser!.uid > action.payload.uid
              ? currentUser!.uid + action.payload.uid
              : action.payload.uid + currentUser!.uid,
        };
    }
  };

  const [state, dispatch] = React.useReducer(chatReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ data: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
