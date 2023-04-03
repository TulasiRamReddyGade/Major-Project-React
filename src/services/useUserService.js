import { useWeb3Contract } from "react-moralis";
import React from "react";

const useUserService = (account, abi, raffleAddress, options) => {
  const { runContractFunction: addUser } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "addUser",
    params: { account: account, name: options.name, role: options.role },
  });

  return addUser;
};

export default useUserService;
