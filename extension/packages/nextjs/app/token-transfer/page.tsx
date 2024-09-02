import React from "react";
import TokenReceiver from "./_components/TokenReceiver";
import TokenTransferor from "./_components/TokenTransferor";
import GettingStarted from "~~/components/chainlink/GettingStarted";

const TokenTransfers: React.FC = () => {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-8">🔄 Cross-Chain Transfer</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <TokenTransferor />
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <TokenReceiver />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <GettingStarted
                introduction={
                  "This page provides an example of how to implement and use Chainlink's Cross-Chain Interoperability Protocol (CCIP) for secure and decentralized token transfers between different blockchain networks. CCIP enables developers to build interoperable applications that can communicate across chains."
                }
                steps={
                  <>
                    <li>
                      Deploy the <span className="font-bold">TokenTransferor.sol</span> on your desired networks. Ensure
                      the contracts are properly configured with the necessary cross-chain messaging settings.
                    </li>
                    <li>
                      Fund the deployed contract with LINK tokens. You can acquire testnet LINK from the{" "}
                      <a className="link" href="https://faucets.chain.link/">
                        Chainlink Faucet
                      </a>{" "}
                      and send the tokens to your contract addresses.
                    </li>
                    <li>
                      Fund the deployed contract with CCIP-BnM tokens. You can acquire testnet CCIP-BnM from the{" "}
                      <a className="link" href="https://docs.chain.link/ccip/test-tokens#mint-test-tokens">
                        Chainlink Documentation page
                      </a>{" "}
                      and send the tokens to your contract addresses.
                    </li>
                    <li>
                      Select the destination network, enter the amount of tokens to transfer, and execute the
                      transaction.
                    </li>
                    <li>
                      To view the transaction, cou can copy the Destination Transaction Hash from the{" "}
                      <a className="link" href="https://ccip.chain.link/">
                        Chainlink CCIP explorer
                      </a>{" "}
                      , and use this to monitor the transaction status and verify the token transfer on the destination
                      network block explorer.
                    </li>
                  </>
                }
                details={
                  <>
                    <li>
                      The Chainlink CCIP leverages decentralized oracle networks to securely transfer tokens across
                      different blockchains. This enables the creation of highly interoperable decentralized
                      applications.
                    </li>
                    <li>
                      For more details on transfering tokens using CCIP, refer to the{" "}
                      <a className="link" href="https://docs.chain.link/ccip/tutorials/cross-chain-tokens">
                        official Chainlink CCIP documentation.
                      </a>{" "}
                      This includes comprehensive guides on setting up your contracts, testing, and managing cross-chain
                      token transfers.
                    </li>
                    <li>
                      Be sure to monitor your contract’s LINK and CCIP-BnM balance, as sufficient funds are required for
                      the cross-chain messaging operations.
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

export default TokenTransfers;
