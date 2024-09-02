"use client";

import { Address, formatEther } from "viem";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

/**
 * Display LINK balance of an ETH address.
 */
export const UpkeepBalance = () => {
  const { targetNetwork } = useTargetNetwork();

  const { data, isLoading } = useScaffoldReadContract({
    contractName: "AutomationConsumer",
    functionName: "getUpkeepInfo",
  });

  return (
    <div>
      <div className="flex gap-1 items-center ">
        <span className="font-bold text-xs">Upkeep Balance:</span>

        <div className="w-full text-s flex items-center justify-center">
          {data && data.balance && (
            <>
              <span>{Number(formatEther(data.balance)).toFixed(4)}</span>
              <span className="text-xs font-bold ml-1">LINK</span>
            </>
          )}
        </div>
      </div>
      <a
        href="https://faucets.chain.link"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-xs text-blue-500 underline block"
      >
        Chainlink Faucet
      </a>
    </div>
  );
};
