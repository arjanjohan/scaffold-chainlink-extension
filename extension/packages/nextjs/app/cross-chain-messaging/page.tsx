"use client";

import MessageReceiver from "./_components/MessageReceiver";
import MessageSender from "./_components/MessageSender";
import type { NextPage } from "next";
import GettingStarted from "~~/components/chainlink/GettingStarted";

const MessagingPage: NextPage = () => {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-8">✉️ Cross-Chain Messaging</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <MessageSender />
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <MessageReceiver />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <GettingStarted
                introduction={
                  "This page demonstrates how to use the Chainlink CCIP contract for cross-chain messaging. CCIP allows developers to build secure and decentralized applications that can communicate across different blockchain networks."
                }
                steps={
                  <>
                    <li>
                      Start by deploying the CCIP contracts on your desired networks. Make sure that the contracts are
                      properly configured with the necessary cross-chain messaging settings.
                    </li>
                    <li>
                      Fund the deployed contracts with LINK tokens. You can acquire testnet LINK from the{" "}
                      <a className="link" href="https://faucets.chain.link/">
                        Chainlink Faucet
                      </a>{" "}
                      and send the tokens to your contract addresses.
                    </li>
                    <li>
                      Use the <span className="font-bold">MessageSender</span> component to send messages across
                      different blockchain networks. Select your destination network, enter your message, and execute
                      the transaction.
                    </li>
                    <li>
                      The <span className="font-bold">MessageReceiver</span> component allows you to view the messages
                      received on the destination network. Ensure that your contract is properly set up to handle
                      incoming messages.
                    </li>
                  </>
                }
                details={
                  <>
                    <li>
                      The Chainlink CCIP leverages decentralized oracle networks to securely transfer data and messages
                      across different blockchains. This enables the creation of highly interoperable applications.
                    </li>
                    <li>
                      For more details on deploying and configuring CCIP, refer to the{" "}
                      <a className="link" href="https://docs.chain.link/ccip/getting-started">
                        official Chainlink CCIP documentation.
                      </a>{" "}
                      This includes comprehensive guides on setting up your contracts, testing, and managing cross-chain
                      communications.
                    </li>
                    <li>
                      Be sure to monitor your contract’s LINK balance, as sufficient funds are required for the
                      cross-chain messaging operations.
                    </li>
                  </>
                }
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
