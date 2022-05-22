import React, { useState } from "react";
import { UserContext } from "./helpers/UserContext";

function AppProvider(props) {
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const [user, setUser] = useState(getCurrentUser());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default AppProvider;
