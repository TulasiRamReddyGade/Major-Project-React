import React, { useReducer, useRef, useEffect } from "react";
import { TextField, Button, InputLabel, Select, MenuItem } from "@mui/material";
import styles from "./institution.module.css";
import contractAddresses from "../constants/contractAddresses.json";
import abi from "../constants/abi.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useHistory } from "react-router-dom";
import Navbar from "../Components/NavBar";

const certInitState = { studentaccount: "", certName: "", certType: "" };
const certReducer = (state, action) => {
  if (action.type === "Certificate")
    return {
      studentaccount: action.studentaccount,
      certName: action.certName,
      certType: action.certType,
    };
};

function Institution() {
  const { account, chainId: chainIdHex } = useMoralis();
  const [certSate, certDispatcher] = useReducer(certReducer, certInitState);
  console.log(certSate);
  const formData = [useRef(), useRef(), useRef()];
  const chainId = parseInt(chainIdHex);
  const history = useHistory();
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const { runContractFunction: generateCertificate } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "generateCertificate",
    params: {
      org_account: account,
      stu_account: certSate.studentaccount,
      cert_name: certSate.certName,
      cert_type: certSate.certType,
    },
  });
  const insertCertificate = async () => {
    const val = await generateCertificate();
    console.log(val);
  };
  const SubmitHandler = (event) => {
    console.log();
    event.preventDefault();
    console.log(1);
    certDispatcher({
      type: "Certificate",
      certType: formData[2].current.value,
      certName: formData[1].current.value,
      studentaccount: formData[0].current.value,
    });
  };

  useEffect(() => {
    if (
      certSate.certName !== "" &&
      certSate.certType !== "" &&
      certSate.studentaccount != ""
    ) {
      // call the function
      insertCertificate();
    }
  }, [certSate]);

  return (
    <div>
      <Navbar data="Institue" />
      <div>
        <div className={styles["banner"]}></div>
        <form className={styles["signup-form"]} onSubmit={SubmitHandler}>
          <h2>Issue Certificate</h2>
          <div className={styles["signup-form-fields"]}>
            <p>Enter Student Account Address</p>
            <TextField
              required
              id="outlined-basic"
              type="text"
              variant="outlined"
              inputRef={formData[0]}
            />
          </div>
          <div className={styles["signup-form-fields"]}>
            <p>Enter Certificate Name</p>
            <TextField
              required
              id="outlined-basic"
              type="text"
              variant="outlined"
              inputRef={formData[1]}
            />
          </div>
          <div className={styles["signup-form-fields"]}>
            <p>Enter Certificate Type</p>
            <span style={{ width: "100%" }}>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role"
                style={{ width: "100%" }}
                inputRef={formData[2]}
              >
                <MenuItem value={"Partcipation"}>Partcipation</MenuItem>
                <MenuItem value={"Merit"}>Merit</MenuItem>
              </Select>
            </span>
          </div>
          <Button variant="contained" size="large" color="info" type="submit">
            Create
          </Button>
          {/* <Button
            variant="contained"
            size="large"
            color="info"
            onClick={() => {
              history.push("/Institution/Certificates");
            }}
          >
            Get All Certificates
          </Button> */}
        </form>
      </div>
    </div>
  );
}

export default Institution;
