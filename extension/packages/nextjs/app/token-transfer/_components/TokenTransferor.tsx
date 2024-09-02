"use client";

import { useState } from "react";
import { BnmBalance } from "./BnmBalance";
import { useAccount } from "wagmi";
import { LinkBalance, TxReceipt } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { networks, tokenAddresses } from "~~/utils/chainlink/networks";

const TokenTransferor: React.FC = () => {
  const contractName = "TokenTransferor";

  const { address, chain } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [destinationNetwork, setDestinationNetwork] = useState("");
  const [ccipChainId, setCcipChainId] = useState<bigint | undefined>();
  const [txHash, setTxHash] = useState<string | null>(null);

  const { data: contract } = useScaffoldContract({ contractName });

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = networks.find(network => network.name === e.target.value);
    if (selected) {
      setDestinationNetwork(selected.name);
      setCcipChainId(selected?.ccipChainId);
    }
  };

  const { writeContractAsync: writeSender, isPending: isPendingSender } = useScaffoldWriteContract(contractName);

  const sendToken = async () => {
    if (!address) {
      console.log("No address available");
      return;
    }
    if (!ccipChainId) {
      console.log("No ccipChainId available");
      return;
    }
    if (!chain) {
      console.log("No chain details available");
      return;
    }

    try {
      const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 10 ** 18));

      console.log("Sending token...", tokenAddresses[chain.name].assets.BnM);
      const tx = await writeSender({
        functionName: "transferTokensPayLINK",
        args: [ccipChainId, address, tokenAddresses[chain.name].assets.BnM, amountBigInt],
      });
      if (tx) {
        setTxHash(tx);
      }
      console.log("Token sent!");
    } catch (error) {
      console.error("Error sending token: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">{contractName}</h2>

        <Address address={contract?.address} />
        <div className="mb-4 mt-4">
          {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}
          {contract && <LinkBalance address={contract.address} className="px-0 h-1.5 min-h-[0.375rem]" />}
          {contract && <BnmBalance address={contract.address} className="px-0 h-1.5 min-h-[0.375rem]" />}
        </div>

        <input
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="input input-bordered w-full mb-4"
        />

        <select
          value={destinationNetwork || ""}
          onChange={handleNetworkChange}
          className="select select-bordered w-full mb-4"
        >
          <option value="" disabled>
            Select destination network
          </option>
          {networks
            .filter(network => network.chainId !== chain?.id) // Exclude the current network
            .map(network => (
              <option key={network.chainId} value={network.name}>
                {network.name}
              </option>
            ))}
        </select>
        <div className="w-full">
          <button className={"btn btn-accent w-full"} disabled={isPendingSender} onClick={sendToken}>
            {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}
            {isPendingSender ? "Sending message" : "Send message"}
          </button>
        </div>
        <div className="flex-grow basis-0 mt-4">
          <TxReceipt txHash={txHash} />
        </div>
      </div>
    </div>
  );
};

export default TokenTransferor;
