import React, { useEffect, useReducer, useState } from "react";
import styles from "./home.module.css";
import studentImage from "./students.png";
import instituteImage from "./building.png";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useMoralis, useWeb3Contract } from "react-moralis";
import contractAddresses from "../constants/contractAddresses.json";
import abi from "../constants/abi.json";
// import useUserService from "../services/useUserService";

const newUserState = { name: "", role: "" };
const newUserStateReducer = (state, action) => {
  if ((action.type = "newUser")) {
    return { name: action.name, role: action.role };
  }
};

const Home = (props) => {
  const [newState, newStateUpdateFunction] = useReducer(
    newUserStateReducer,
    newUserState
  );

  const {
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    account,
    Moralis,
    deactivateWeb3,
    chainId: chainIdHex,
  } = useMoralis();

  console.log(account);

  useEffect(() => {
    if (
      !isWeb3Enabled &&
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((newAccount) => {
      console.log(`Account changed to ${newAccount}`);
      if (newAccount == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null Account found");
      }
    });
  }, []);
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const { runContractFunction: doesUserExists } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "doesUserExists",
    params: { account: account },
  });
  const { runContractFunction: getUser } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getUser",
    params: { account: account },
  });
  const { runContractFunction: addUser } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "addUser",
    params: { account: account, name: newState.name, role: newState.role },
  });

  useEffect(() => {
    if (newState.name !== "" && newState.role !== "") {
      const val = addUser();
      console.log(val);
    }
  }, [newState]);

  const LoginHandler = async (role) => {
    let result = await doesUserExists();
    if (result) {
      let user = await getUser();
      if (user[1] !== role) {
        alert("Please login in correct role");
      } else {
        localStorage.setItem("account", account);
        localStorage.setItem("name", user[0]);
        localStorage.setItem("role", user[1]);
        props.userDispatchFunction({
          type: "accountUpdate",
          account,
          name: user[0],
          role: user[1],
        });
      }
    } else {
      let name = prompt("Enter your name");
      newStateUpdateFunction({ type: "newUser", name, role });
    }
  };

  return (
    <div className={styles["Home"]}>
      <div className={styles["Grid"]}>
        <div className={styles["Item"]}>
          <h2>Student</h2>
          <img
            src={studentImage}
            className={styles["Image"]}
            alt="StudentImage"
          />
          <div className={styles["ButtonGroup"]}>
            <Button
              variant="contained"
              color="success"
              onClick={async () => {
                const ret = await enableWeb3();
                if (typeof ret !== "undefined") {
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("connected", "injected");
                    await LoginHandler("Student");
                  }
                }
              }}
              disabled={isWeb3EnableLoading}
            >
              Connect
            </Button>
          </div>
        </div>
        <div className={styles["Item"]}>
          <h2>Institution</h2>
          <img
            src={instituteImage}
            className={styles["Image"]}
            alt="instituteImage"
          />
          <div className={styles["ButtonGroup"]}>
            <Button
              variant="contained"
              color="success"
              onClick={async () => {
                const ret = await enableWeb3();
                if (typeof ret !== "undefined") {
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("connected", "injected");
                    await LoginHandler("Institution");
                  }
                }
              }}
              disabled={isWeb3EnableLoading}
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
