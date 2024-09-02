"use client";

import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { tokenAddresses } from "~~/utils/chainlink/networks";

const TokenReceiver: React.FC = () => {
  const { address } = useAccount();
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

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        {" "}
        <h2 className="text-2xl font-bold">CCIP-BnM ERC20</h2>
        {BnmTokenAddress && <Address address={BnmTokenAddress} />}
        <div>
          <h2 className="text-l font-bold mt-4">Token Balance:</h2>
          <div className="flex gap-1 items-center ">
            <span>{formattedBalance.toFixed(4)}</span>
            <span className="text-s font-bold">CCIP-BnM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenReceiver;
