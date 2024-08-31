"use client";

import { useRef, useState } from "react";
import { useAccount } from "wagmi";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { LinkBalance } from "~~/components/chainlink";
import { NetworkOptions } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton/NetworkOptions";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { networks } from "~~/utils/chainlink/networks";

const TokenSender: React.FC = () => {
  const contractName = "Sender";
  const { address, chain } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [destinationNetwork, setDestinationNetwork] = useState("");
  const [ccipChainId, setCcipChainId] = useState<bigint | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = networks.find(network => network.name === e.target.value);
    console.log("selected", selected);
    setDestinationNetwork(selected?.name);
    console.log("selected?.ccipChainId", selected?.ccipChainId);
    setCcipChainId(selected?.ccipChainId);
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

    const hardcodedMessage = `Sending ${amount} of ${selectedToken}`;

    try {
      console.log("Sending token...");
      console.log("ccipChainId", ccipChainId);
      console.log("address", address);
      console.log("message", hardcodedMessage);
      await writeSender({
        functionName: "sendMessage",
        args: [ccipChainId, address, hardcodedMessage],
      });
      console.log("Token sent!");
    } catch (error) {
      console.error("Error sending token: ", error);
    }
  };

  return (
    <div className="flex flex-col bg-base-100 px-10 text-center items-center max-w-xs rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Send from: </h2>

      <div className="w-full">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="select select-bordered w-full text-left flex items-center justify-between"
          >
            <span>{chain?.name || "Unknown"}</span>
            <ChevronDownIcon className="h-5 w-5" />
          </button>
          <ul
            className={`absolute left-0 right-0 mt-1 bg-base-100 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <NetworkOptions hidden={false} />
          </ul>
        </div>
      </div>
      <div className="flex gap-1 items-center mb-4">
        {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}

        {!deployedContractLoading && deployedContractData && (
          <LinkBalance address={deployedContractData.address} className="px-0 h-1.5 min-h-[0.375rem]" />
        )}
      </div>
      <input
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <select
        value={selectedToken}
        onChange={e => setSelectedToken(e.target.value)}
        className="select select-bordered w-full mb-4"
      >
        <option value="" disabled>
          Select token
        </option>
        {/* Add your token options here */}
        <option value="TokenA">TokenA</option>
        <option value="TokenB">TokenB</option>
        <option value="TokenC">TokenC</option>
      </select>
      <select
        value={destinationNetwork || ""}
        onChange={handleNetworkChange}
        className="select select-bordered w-full mb-4"
      >
        <option value="" disabled>
          Select destination network
        </option>
        {networks.map(network => (
          <option key={network.chainId} value={network.name}>
            {network.name}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
        <div className="flex justify-between gap-2 flex-wrap">
          <button className={`btn btn-accent btn-sm`} disabled={isPendingSender} onClick={sendToken}>
            {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}
            {isPendingSender ? "Sending token" : "Send token"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSender;
