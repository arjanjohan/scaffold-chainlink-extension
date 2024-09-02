"use client";

import { Address, formatEther } from "viem";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { tokenAddresses } from "~~/utils/chainlink/networks";

type BalanceProps = {
  address?: Address;
  className?: string;
};

/**
 * Display Bnm balance of an ETH address.
 */
export const BnmBalance = ({ address }: BalanceProps) => {
  const { targetNetwork } = useTargetNetwork();

  const BnmTokenAddress =
    targetNetwork?.name && tokenAddresses[targetNetwork.name] ? tokenAddresses[targetNetwork.name].assets.BnM : null;

  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
    token: BnmTokenAddress!,
  });

  if (!address || isLoading || balance === null) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  return (
    <div>
      <div className="flex gap-1 items-center ">
        <span className="font-bold text-xs">Balance:</span>

        <div className="w-full text-s flex items-center justify-center">
          <>
            <span>{formattedBalance.toFixed(4)}</span>
            <span className="text-xs font-bold ml-1">CCIP-BnM</span>
          </>
        </div>
      </div>
      <a
        href="https://docs.chain.link/ccip/test-tokens#mint-test-tokens"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-xs text-blue-500 underline block"
      >
        Mint CCIP-BnM Tokens
      </a>
    </div>
  );
};
