"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LinkBalance, TxReceipt } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { networks } from "~~/utils/chainlink/networks";

const MessageSender: React.FC = () => {
  const contractName = "MessageSender";
  const [message, setMessage] = useState("");
  const [destinationNetwork, setDestinationNetwork] = useState<string>("");
  const [ccipChainId, setCcipChainId] = useState<bigint | undefined>();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [receiverAddress, setReceiverAddress] = useState<string | null>(null);

  const { data: contract } = useScaffoldContract({ contractName });
  const { writeContractAsync: writeSender, isPending: isPendingSender } = useScaffoldWriteContract(contractName);
  const { chain } = useAccount();

  useEffect(() => {
    if (destinationNetwork) {
      const selected = networks.find(network => network.name === destinationNetwork);
      if (selected) {
        setCcipChainId(selected.ccipChainId);

        // Find the chainId in the deployedContracts object and get the receiver contract address
        const chainId = selected.chainId as number;
        const receiverContract = deployedContracts[chainId]?.MessageReceiver;

        if (receiverContract) {
          setReceiverAddress(receiverContract.address);
        } else {
          console.error("No receiver contract found for the selected network");
          setReceiverAddress(null);
        }
      }
    }
  }, [destinationNetwork]);

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDestinationNetwork(e.target.value);
  };

  const sendMessage = async () => {
    if (!ccipChainId || !receiverAddress) {
      console.log("Missing required data to send message");

      return;
    }

    try {
      console.log("Sending message...");
      const tx = await writeSender({
        functionName: "send",
        args: [ccipChainId, receiverAddress, message, 1],
      });
      if (tx) {
        setTxHash(tx);
      }

      console.log("Message sent!");
    } catch (error) {
      console.error("Error sending message: ", error);
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
        </div>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
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
          <button className={"btn btn-accent w-full"} disabled={isPendingSender} onClick={sendMessage}>
            {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}
            {isPendingSender ? "Sending message" : "Send message"}
          </button>
        </div>
        <div className="flex-grow basis-0">
          <TxReceipt txHash={txHash} />
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
