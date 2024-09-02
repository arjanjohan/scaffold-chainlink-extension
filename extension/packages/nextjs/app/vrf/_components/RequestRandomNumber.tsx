"use client";

import { LinkBalance } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RequestRandomNumber: React.FC = () => {
  const contractName = "RandomNumberDirectFundingConsumerV2Plus";
  const gasLimit = 100000;
  const numWords = 2;
  const requestConfirmations = 3;

  const { writeContractAsync: requestRandomWords, isPending } = useScaffoldWriteContract(contractName);
  const { data: contract } = useScaffoldContract({ contractName });

  const handleRequest = async () => {
    try {
      await requestRandomWords({
        functionName: "requestRandomWords",
        args: [gasLimit, requestConfirmations, numWords],
      });
    } catch (error) {
      console.error("Error requesting randomness", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">Request Random Numbers</h2>
        <Address address={contract?.address} />

        {isPending && <span className="loading loading-spinner loading-xs"></span>}
        <div className="mb-4 mt-4">
          {contract && <LinkBalance address={contract.address} className="px-0 h-1.5 min-h-[0.375rem]" />}
        </div>
        <div className="w-full">
          <button className={"btn btn-accent w-full"} disabled={isPending} onClick={handleRequest}>
            {isPending && <span className="loading loading-spinner loading-xs"></span>}
            {isPending ? "Requesting randomness" : "Submit request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestRandomNumber;
