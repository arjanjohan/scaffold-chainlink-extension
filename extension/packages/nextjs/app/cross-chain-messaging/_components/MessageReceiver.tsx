"use client";

import { useState } from "react";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const MessageReceiver: React.FC = () => {
  const contractName = "MessageReceiver";
  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: contract } = useScaffoldContract({ contractName });

  const { data: messageData, isLoading: messageLoading } = useScaffoldReadContract({
    contractName,
    functionName: "getLatestMessageDetails",
  });

  const refreshMessage = () => {
    setIsRefreshing(true);

    try {
      console.log("Refreshing message...", messageData);
      if (messageData) {
        setReceivedMessage(messageData[3]);
      } else {
        setReceivedMessage(null);
      }
    } catch (error) {
      console.error("Error refreshing message: ", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        {" "}
        <h2 className="text-2xl font-bold">{contractName}</h2>
        <Address address={contract?.address} />
        <div className="flex gap-1 items-center mb-4 mt-4">
          <span className="font-bold text-sm">Message:</span>
          {isRefreshing || messageLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : receivedMessage ? (
            <span>{receivedMessage}</span>
          ) : (
            <span>No message received</span>
          )}
        </div>
        <div className="w-full">
          <button
            className={"btn btn-accent w-full"}
            onClick={refreshMessage}
            disabled={isRefreshing || messageLoading}
          >
            {isRefreshing || messageLoading ? <span className="loading loading-spinner loading-xs"></span> : "Refresh"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageReceiver;
