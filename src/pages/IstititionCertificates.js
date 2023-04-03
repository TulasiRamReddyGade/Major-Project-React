import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import contractAddresses from "../constants/contractAddresses.json";
import abi from "../constants/abi.json";
import CardComponent from "../Components/CardComponent";
import Navbar from "../Components/NavBar";

const IstititionCertificates = () => {
  const [certificateState, certificateUpdateFuction] = useState([]);
  const { account, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  console.log(account);
  console.log(raffleAddress);
  const { runContractFunction: getCertificates_Organisation } = useWeb3Contract(
    {
      abi: abi,
      contractAddress: raffleAddress,
      functionName: "getCertificates_Organisation",
      params: {
        org_account: account,
      },
    }
  );
  const getCertificates = async () => {
    if (account !== "" || account !== undefined) {
      const val = await getCertificates_Organisation();
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
        studentAccount={el[2]}
        orgnisationAccount={account}
        certificateName={el[0]}
        certificateType={el[1]}
      ></CardComponent>
    );
  });
  return (
    <div>
      <Navbar />
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

export default IstititionCertificates;
