"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { LinkBalance } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const SendFunction: React.FC = () => {
  const contractName = "GettingStartedFunctionsConsumer";
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  
  const { data: contract } = useScaffoldContract({ contractName });
  const { writeContractAsync: writeFunctionContract, isPending: isPendingFunctionContract } = useScaffoldWriteContract(contractName);

  const requestData = async () => {
    if (!subscriptionId) {
      console.log("Missing subscription ID");
      return;
    }

    try {
      console.log("Sending request...");
      // Assuming that requestId is the only input
      await writeFunctionContract({
        functionName: "sendRequest",
        args: [
          BigInt(subscriptionId),
          ["1"]
        ],
      });

      console.log("Request sent!");
    } catch (error) {
      console.error("Error sending request: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">{contractName}</h2>

        <Address address={contract?.address} />
        <div className="mb-4 mt-4">
          {isPendingFunctionContract && <span className="loading loading-spinner loading-xs"></span>}
          {contract && <LinkBalance address={contract.address} className="px-0 h-1.5 min-h-[0.375rem]" />}
        </div>
        
        <input
          type="text"
          placeholder="Enter subscription Id"
          value={subscriptionId}
          onChange={e => setSubscriptionId(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        
        <div className="w-full mb-4">
          <button className="btn btn-secondary w-full" onClick={requestData}>
            Send Request
          </button>
        </div>

      </div>
    </div>
  );
};

export default SendFunction;
