import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Logout = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };
  useState(() => {
    logoutHandler();
    history.push("/Login");
  }, []);
  return <div>Logout</div>;
};

export default Logout;
