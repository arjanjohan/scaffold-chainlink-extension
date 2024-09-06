"use client";

import { LinkBalance } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ResultsFunction: React.FC = () => {

  const contractName = "GettingStartedFunctionsConsumer";


  const { data: contract } = useScaffoldContract({ contractName });

  
  const { data: lastError, isLoading: isLastErrorLoading  } = useScaffoldReadContract({
    contractName,
    functionName: "s_lastError",
  });

  const { data: lastResponse, isLoading: isLastResponseLoading} = useScaffoldReadContract({
    contractName,
    functionName: "s_lastResponse",
  });
  
  console.log("lastError", lastError);
  console.log("lastResponse", lastResponse);

  function decodeHex(hexString: string) {
    // Remove the '0x' prefix if it exists
    if (hexString.startsWith("0x")) {
      hexString = hexString.substring(2);
    }
  
    // Convert the hex string to a Buffer
    const buffer = Buffer.from(hexString, "hex");
  
    // Convert the Buffer to a string
    return buffer.toString("utf8");
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">{contractName}</h2>

        <Address address={contract?.address} />
        <div className="mb-4 mt-4">
          {/* {isPendingSender && <span className="loading loading-spinner loading-xs"></span>} */}
          {contract && <LinkBalance address={contract.address} className="px-0 h-1.5 min-h-[0.375rem]" />}
          
        </div>
        <div className="flex gap-1 items-center mb-4 mt-4">
          <span className="font-bold">Last response:</span>
          {isLastResponseLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : lastResponse ? (
            <span>{decodeHex(lastResponse)}</span>
          ) : (
            <span>No response found</span>
          )}
        </div>
        <div className="flex gap-1 items-center ">
          <span className="font-bold">Last error:</span>
          {isLastErrorLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : lastError ? (
            <span>{decodeHex(lastError)}</span>
          ) : (
            <span>No error found</span>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ResultsFunction;
