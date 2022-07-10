//Have a function to call the lottery
import { useWeb3Contract, useMoralis } from "react-moralis";
import { contactAddresses, abi } from "../constants";
import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useNotification } from "web3uikit";

interface contractAddressesInterface {
    [key: string]: string[];
}
export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId: string = parseInt(chainIdHex!).toString();
    const addresses: contractAddressesInterface = contactAddresses;
    const raffleAddress = chainId in addresses ? addresses[chainId][0] : null;

    //using reacts State hook for rerandering if value changes.
    const [entranaceFee, setEntranceFee] = useState("0");
    const [totalPlayers, setTotalPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0");

    const dispatch = useNotification();

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranaceFee,
    });
    const { runContractFunction: getEnteranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getEnteranceFee",
        params: {},
    });

    const { runContractFunction: getPlayersCount } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getNumberOfPlayers",
        params: {},
    });
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getRecentWinner",
        params: {},
    });

    //updating all variables on front-end UI.
    async function updateUI() {
        //read raffle contract
        const entranaceFeeFromCall = ((await getEnteranceFee()) as BigNumber).toString();
        const totalPlayersFromCall = ((await getPlayersCount()) as BigNumber).toString();
        const winnerAddress = (await getRecentWinner()) as string;
        setEntranceFee(entranaceFeeFromCall);
        setTotalPlayers(totalPlayersFromCall);
        setRecentWinner(winnerAddress);
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    const handleSuccess = async (tx: any) => {
        await tx.wait(1);
        handleNewNotification();
        updateUI();
    };
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        });
    };

    return (
        <div className="p-5">
            {raffleAddress ? (
                <div className="">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () => {
                            await enterRaffle({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            });
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Enter Lottery"
                        )}
                    </button>

                    <div>Entrance Fee: {ethers.utils.formatUnits(entranaceFee, "ether")} ETH</div>
                    <div>Total Players: {totalPlayers}</div>
                    <div>Recent Winner: {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Deteched</div>
            )}
        </div>
    );
}
