"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LinkBalance, TxReceipt } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { networks } from "~~/utils/chainlink/networks";

const SendFunction: React.FC = () => {
  const contractName = "FunctionsConsumerExample";
  const [numberList, setNumberList] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string | null>(null);
  const [geometricMean, setGeometricMean] = useState<number | null>(null);

  const { data: contract } = useScaffoldContract({ contractName });
  const { writeContractAsync: writeFunctionContract, isPending: isPendingFunctionContract } = useScaffoldWriteContract(contractName);
  const { chain } = useAccount();

  // Example variables, replace with your actual values
  const source = `/* Your source code */`;
  const subscriptionId = 3n; // TODO: Replace with your actual subscription ID
  const gasLimit = 300000; // Define your gas limit
  const donId = "fun-ethereum-sepolia-1"; // Replace with your DON ID

  const requestCalculation = async () => {
    if (!receiverAddress || geometricMean === null) {
      console.log("Missing required data to send calculation");
      return;
    }

    // Prepare args from the number list
    const args = numberList.split(',').map(num => num.trim());

    try {
      console.log("Sending calculation...");
      // await writeFunctionContract({
      //   functionName: "sendRequest",
      //   args: [
      //     source,
      //     "0x", // Empty string for user hosted secrets
      //     0, // Slot ID for DON hosted secrets (empty in this case)
      //     0n, // Version for DON hosted secrets (empty in this case)
      //     args,
      //     [], // bytesArgs - empty in this case
      //     subscriptionId,
      //     gasLimit,
      //     ethers.utils.formatBytes32String(donId) // Job ID as bytes32
      //   ],
      // });

      console.log("Calculation sent!");
    } catch (error) {
      console.error("Error sending calculation: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">Geometric Mean Calculator</h2>

        <Address address={contract?.address} />
        <div className="mb-4 mt-4">
          {isPendingFunctionContract && <span className="loading loading-spinner loading-xs"></span>}
          {contract && <LinkBalance address={contract.address} className="px-0 h-1.5 min-h-[0.375rem]" />}
        </div>
        <textarea
          placeholder="Enter a list of numbers separated by commas"
          value={numberList}
          onChange={e => setNumberList(e.target.value)}
          className="textarea textarea-bordered w-full mb-4"
        />
        
        <div className="w-full mb-4">
          <button className={"btn btn-secondary w-full"} onClick={requestCalculation}>
            Request Geometric Mean
          </button>
        </div>

      </div>
    </div>
  );
};

export default SendFunction;
