import React, { useState } from "react";
import { UserContext } from "./helpers/UserContext";
import {USER_SESSION_ATTRIBUTE} from "./helpers/AuthenticationService";

function AppProvider(props) {
  const getCurrentUser = () => {
    const currentUser = JSON.parse(sessionStorage.getItem(USER_SESSION_ATTRIBUTE))
    console.log("AppProvider currentUser " + currentUser);
    return currentUser;
  };

  const [user, setUser] = useState(getCurrentUser());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default AppProvider;
