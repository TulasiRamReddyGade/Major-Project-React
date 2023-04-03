import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import contractAddresses from "../constants/contractAddresses.json";
import abi from "../constants/abi.json";
import CardComponent from "../Components/CardComponent";
import Navbar from "../Components/NavBar";

const Student = () => {
  const [certificateState, certificateUpdateFuction] = useState([]);
  const { account, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  console.log("account", account);
  console.log(raffleAddress);
  const { runContractFunction: getCertificates_Student } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getCertificates_Student",
    params: {
      stu_account: account,
    },
  });
  const getCertificates = async () => {
    if (account !== "" || account !== undefined) {
      const val = await getCertificates_Student();
      console.log(val);
      certificateUpdateFuction(val);
    }
  };
  useEffect(() => {
    getCertificates();
  }, []);
  const DisplayElements = certificateState.map((el) => {
    return (
      <CardComponent
        studentAccount={account}
        orgnisationAccount={el[2]}
        certificateName={el[0]}
        certificateType={el[1]}
      ></CardComponent>
    );
  });
  return (
    <div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        {DisplayElements}
      </div>
    </div>
  );
};

export default Student;
