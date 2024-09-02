"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LinkBalance, TxReceipt } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { networks } from "~~/utils/chainlink/networks";

const NftSender: React.FC = () => {
  const contractName = "SourceMinter";
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
        const chainId = selected.chainId;
        const receiverContract = deployedContracts[chainId]?.DestinationMinter;
        console.log("receiverContract", receiverContract);

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

  const mintNft = async () => {
    if (!ccipChainId || !receiverAddress) {
      console.log("Missing required data to send message");

      return;
    }

    try {
      console.log("Sending message...");
      const tx = await writeSender({
        functionName: "mint",
        args: [ccipChainId, receiverAddress, 1],
      });
      setTxHash(tx!);

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
          <button className={"btn btn-accent w-full"} disabled={isPendingSender} onClick={mintNft}>
            {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}
            {isPendingSender ? `Minting NFT on ${destinationNetwork}...` : `Mint NFT on ${destinationNetwork}`}
          </button>
        </div>
        <div className="flex-grow basis-0 mt-4">
          <TxReceipt txHash={txHash} />
        </div>
      </div>
    </div>
  );
};

export default NftSender;
