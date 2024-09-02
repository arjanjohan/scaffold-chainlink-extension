"use client";

import { useEffect, useState } from "react";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const ViewRandomNumbers: React.FC = () => {
  const contractName = "RandomNumberDirectFundingConsumerV2Plus";

  const [customRequestId, setCustomRequestId] = useState<bigint | null>(null);
  const [lastRequestId, setLastRequestId] = useState<bigint | null>(null);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: contract } = useScaffoldContract({ contractName });

  // Fetch the last request ID when the component mounts
  const { data: fetchedRequestId } = useScaffoldReadContract({
    contractName: contractName,
    functionName: "lastRequestId",
    watch: true,
  });

  const { data: vrfData } = useScaffoldReadContract({
    contractName,
    functionName: "getRequestStatus",
    args: customRequestId ? [customRequestId] : lastRequestId ? [lastRequestId] : ([] as [bigint | undefined]),
    watch: true,
  });

  useEffect(() => {
    if (fetchedRequestId) {
      setLastRequestId(BigInt(fetchedRequestId));
    }
  }, [fetchedRequestId]);

  const handleView = async () => {
    if (lastRequestId) {
      try {
        if (vrfData && vrfData[1] === true) {
          setRandomNumbers(vrfData[2].map((num: bigint) => Number(num)));
          setErrorMessage(null);
        } else if (vrfData && vrfData[1] === false) {
          setErrorMessage("Request is not fulfilled yet.");
        } else {
          setErrorMessage("No random numbers found.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch the request status.");
      }
    } else {
      setErrorMessage("Last Request ID not found.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">View Random Numbers</h2>
        <Address address={contract?.address} />
        <div className="w-full mb-4">
          <label className="font-bold text-sm">Request ID:</label>
          <input
            type="number"
            onChange={e => setCustomRequestId(BigInt(e.target.value))}
            className="input input-bordered w-full mt-2"
          />
          <p className="text-xs mt-1">Leave request ID field empty to fetch results of the most recent request</p>
        </div>
        <div className="w-full">
          <button className="btn btn-accent w-full" onClick={handleView}>
            Refresh
          </button>
        </div>
        {randomNumbers.length > 0 && (
          <div className="bg-secondary rounded-3xl text-sm px-4 py-2 mt-4 w-full max-w-full break-words">
            <p className="font-bold m-0 mb-2">Result:</p>
            <pre className="whitespace-pre-wrap break-words">{randomNumbers.join(", ")}</pre>
          </div>
        )}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ViewRandomNumbers;
