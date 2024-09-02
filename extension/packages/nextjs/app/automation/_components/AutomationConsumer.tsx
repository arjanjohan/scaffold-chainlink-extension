"use client";

import {  useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { LinkBalance } from "~~/components/chainlink";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const AutomationConsumer: React.FC = () => {
  const contractName = "AutomationConsumer";

  const { data: contract } = useScaffoldContract({ contractName });

  console.log("contract", contract);
  const { data: upkeep, isLoading: isUpkeepLoading } = useScaffoldReadContract({
    contractName: "AutomationConsumer",
    functionName: "getUpkeepInfo",
  });
  console.log("upkeep", upkeep);

  const { data: currentCount } = useScaffoldReadContract({
    contractName: "AutomationConsumer",
    functionName: "s_counter",
  });

  const { data: isCounting } = useScaffoldReadContract({
    contractName: "AutomationConsumer",
    functionName: "s_isCounting",
  });

  const { data: interval } = useScaffoldReadContract({
    contractName: "AutomationConsumer",
    functionName: "s_interval",
  });

  const { writeContractAsync: startCounting } = useScaffoldWriteContract("AutomationConsumer");

  const { writeContractAsync: stopCounting } = useScaffoldWriteContract("AutomationConsumer");


  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">{contractName}</h2>

        <Address address={contract?.address} />
        <div className="mb-4 mt-4">
          {contract && (
            <div>
              <div className="flex gap-1 items-center ">
                <span className="font-bold text-xs">Upkeep:</span>

                <div className="w-full text-s flex items-center justify-center">
                  {upkeep && (
                    <>
                      <span>{Number(formatEther(upkeep.balance)).toFixed(4)}</span>
                      <span className="text-xs font-bold ml-1">LINK</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {contract && <LinkBalance address={contract.address} className="px-0 h-1.5 min-h-[0.375rem]" />}
          
        </div>

        <p className="text-xl">
          Since smart contracts cannot initate transactions without the help of an externally owned account, a service
          like chainlink automation is required to reliably execute transactions at regular intervals or based on
          conditional logic triggers
        </p>

        <p className="text-xl">
          Click <span className="font-bold">start</span> to update the boolean state variable integrated with the{" "}
          <span className="font-bold">checkUpKeep</span> function&apos;s return value that controls if chainlink nodes
          should call the <span className="font-bold">performUpkeep</span> function every{" "}
          <span className="font-bold">interval</span> seconds.
        </p>

        <div className="rounded-xl flex flex-wrap justify-around items-center">
          <div className="stats bg-base-300">
            <div className="stat">
              <div className="stat-value">{interval?.toString()}</div>
              <div className="stat-title">interval</div>
            </div>
          </div>
          <div className="stats bg-base-200">
            <div className="stat">
              <div className={`stat-value ${isCounting ? "text-green-500" : "text-red-500"}`}>
                {isCounting?.toString()}
              </div>
              <div className="stat-title">isCounting</div>
            </div>
          </div>
          <div className="stats bg-base-300">
            <div className="stat">
              <div className="stat-value">{Number(currentCount)}</div>
              <div className="stat-title">counter</div>
            </div>
          </div>
        </div>
        {isCounting ? (
              <button
                onClick={async () =>
                  stopCounting({
                    functionName: "stopCounting",

                    // onBlockConfirmation: txnReceipt => {
                    //   console.log("Transaction blockHash", txnReceipt.blockHash);
                    // },
                  })
                }
                className="btn btn-error font-cubano text-xl rounded-lg px-7 mt-4"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={async () =>
                  startCounting({
                    functionName: "startCounting",

                  })
                }
                className="btn btn-primary font-cubano text-xl rounded-lg px-7 mt-4"
              >
                Start
              </button>
            )}
      </div>
    </div>
  );
};

export default AutomationConsumer;
