import contractAddresses from "../constants/contractAddresses.json";
import abi from "../constants/abi.json";
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";

export default function Certificate() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();
  // These get re-rendered every time due to our connect button!
  const chainId = parseInt(chainIdHex);
  // console.log(`ChainId is ${chainId}`)
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  // State hooks
  // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
  // const [entranceFee, setEntranceFee] = useState("0")
  // const [numberOfPlayers, setNumberOfPlayers] = useState("0")
  // const [recentWinner, setRecentWinner] = useState("0")

  // const dispatch = useNotification()

  // const {
  //     runContractFunction: enterRaffle,
  //     data: enterTxResponse,
  //     isLoading,
  //     isFetching,
  // } = useWeb3Contract({
  //     abi: abi,
  //     contractAddress: raffleAddress,
  //     functionName: "enterRaffle",
  //     msgValue: entranceFee,
  //     params: {},
  // })

  /* View Functions */

  const { runContractFunction: addUser } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "addUser",
    params: { account: account, name: "Ram", role: "Student" },
  });

  const { runContractFunction: getUser } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getUser",
    params: { account: account },
  });

  // const { runContractFunction: getRecentWinner } = useWeb3Contract({
  //     abi: abi,
  //     contractAddress: raffleAddress,
  //     functionName: "getRecentWinner",
  //     params: {},
  // })

  // async function updateUIValues() {
  //     // Another way we could make a contract call:
  //     // const options = { abi, contractAddress: raffleAddress }
  //     // const fee = await Moralis.executeFunction({
  //     //     functionName: "getEntranceFee",
  //     //     ...options,
  //     // })
  //     const entranceFeeFromCall = (await getEntranceFee()).toString()
  //     const numPlayersFromCall = (await getPlayersNumber()).toString()
  //     const recentWinnerFromCall = await getRecentWinner()
  //     setEntranceFee(entranceFeeFromCall)
  //     setNumberOfPlayers(numPlayersFromCall)
  //     setRecentWinner(recentWinnerFromCall)
  // }

  // useEffect(() => {
  //     if (isWeb3Enabled) {
  //         updateUIValues()
  //     }
  // }, [isWeb3Enabled])
  // no list means it'll update everytime anything changes or happens
  // empty list means it'll run once after the initial rendering
  // and dependencies mean it'll run whenever those things in the list change

  // An example filter for listening for events, we will learn more on this next Front end lesson
  // const filter = {
  //     address: raffleAddress,
  //     topics: [
  //         // the name of the event, parnetheses containing the data type of each event, no spaces
  //         utils.id("RaffleEnter(address)"),
  //     ],
  // }

  // const handleNewNotification = () => {
  //     dispatch({
  //         type: "info",
  //         message: "Transaction Complete!",
  //         title: "Transaction Notification",
  //         position: "topR",
  //         icon: "bell",
  //     })
  // }

  // const handleSuccess = async (tx) => {
  //     try {
  //         await tx.wait(1)
  //         updateUIValues()
  //         handleNewNotification(tx)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  console.log(account);
  const addHandler = async () => {
    try {
      const val = await addUser();
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  };
  const getHandler = async () => {
    try {
      const val = await getUser();
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <button onClick={addHandler}>Add User</button>
      <button onClick={getHandler}>Get User</button>
    </div>
  );
}
