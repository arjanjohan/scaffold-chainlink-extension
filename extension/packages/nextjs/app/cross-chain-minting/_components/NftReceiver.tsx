"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const NftReceiver: React.FC = () => {
  const contractName = "DestinationMinter";
  const nftContractName = "BGNFT";
  const { address, chain } = useAccount();

  const [nftBalance, setNftBalance] = useState<bigint>(0n);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTransferOwnership, setIsTransferOwnership] = useState(false);
  const { data: contract } = useScaffoldContract({ contractName });

  const {
    data: nftBalanceOfData,
    isLoading: isNftBalanceOfLoading,
    refetch: refetchNftBalance,
  } = useScaffoldReadContract({
    contractName: nftContractName,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: nftContractOwner, isLoading: isNftContractOwnerLoading } = useScaffoldReadContract({
    contractName: nftContractName,
    functionName: "owner",
  });

  const { writeContractAsync: writeTransferOwnership, isPending: isTransferOwnershipPending } =
    useScaffoldWriteContract(nftContractName);

  const refreshNftBalance = () => {
    setIsRefreshing(true);
    refetchNftBalance();
    try {
      console.log("Refreshing NFT Balance...", nftBalanceOfData);
      if (nftBalanceOfData) {
        setNftBalance(nftBalanceOfData);
      } else {
        setNftBalance(0n);
      }
    } catch (error) {
      console.error("Error refreshing NFT Balance: ", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const transferOwnership = async () => {
    setIsTransferOwnership(true);
    if (!contract) {
      console.log(`${contractName} contract not found`);
      return;
    }

    try {
      console.log("Transferring ownership...");
      await writeTransferOwnership({
        functionName: "transferOwnership",
        args: [contract.address],
      });

      console.log("Ownership transferred sent!");
    } catch (error) {
      console.error("Error transferring ownership: ", error);
    } finally {
      setIsTransferOwnership(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        {" "}
        <h2 className="text-2xl font-bold">{contractName}</h2>
        <Address address={contract?.address} />
        {!isNftContractOwnerLoading && nftContractOwner !== contract?.address && (
          <div className="w-full mt-4">
            <button
              className={"btn btn-accent w-full"}
              onClick={transferOwnership}
              disabled={isTransferOwnership || isTransferOwnershipPending}
            >
              {isTransferOwnership || isTransferOwnershipPending ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Transfer NFT Contract Ownership"
              )}
            </button>
          </div>
        )}
        <div className="flex gap-1 items-center mb-4 mt-4">
          {chain && <span className="font-bold text-sm">Number of NFT&apos;s on {chain.name}:</span>}

          {isRefreshing || isNftBalanceOfLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            nftBalance.toString()
          )}
        </div>
        <div className="w-full">
          <button
            className={"btn btn-accent w-full"}
            onClick={refreshNftBalance}
            disabled={isRefreshing || isNftBalanceOfLoading}
          >
            {isRefreshing || isNftBalanceOfLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Refresh"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NftReceiver;
