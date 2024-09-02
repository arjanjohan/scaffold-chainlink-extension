"use client";

import NftReceiver from "./_components/NftReceiver";
import NftSender from "./_components/NftSender";
import type { NextPage } from "next";
import GettingStarted from "~~/components/chainlink/GettingStarted";

const MessagingPage: NextPage = () => {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-8">🖼️ Cross-Chain NFT Minting</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <NftSender />
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <NftReceiver />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <GettingStarted
                introduction={
                  "This page demonstrates how to use Chainlink's CCIP to mint NFTs across different blockchain networks. CCIP enables developers to create secure, decentralized applications that can operate seamlessly across chains, allowing for the minting and management of NFTs on multiple networks."
                }
                steps={
                  <>
                    <li>
                      Start by deploying the <span className="font-bold">BGNFT.sol</span> and{" "}
                      <span className="font-bold">DestinationMinter.sol</span> smart contracts to the destination
                      blockchain.
                    </li>
                    <li>
                      Deploy the <span className="font-bold">SourceMinter.sol</span> contract to the source blockchain.
                    </li>
                    <li>
                      Transfer the <span className="font-bold">BGNFT.sol</span> ownership to the{" "}
                      <span className="font-bold">DestinationMinter</span> smart contract address.
                    </li>
                    <li>
                      Fund the deployed contracts with LINK tokens. You can obtain testnet LINK from the{" "}
                      <a className="link" href="https://faucets.chain.link/">
                        Chainlink Faucet
                      </a>{" "}
                      and send the tokens to your contract addresses.
                    </li>
                    <li>
                      Use the <span className="font-bold">SourceMinter</span> component to mint NFTs on your source
                      network. Select the source network, specify the amount, and initiate the minting process.
                    </li>
                    <li>
                      The <span className="font-bold">DestinationMinter</span> component allows you to view NFTs minted
                      on the destination network. Ensure your contracts are properly configured to handle the
                      cross-chain minting process.
                    </li>
                  </>
                }
                details={
                  <>
                    <li>
                      The Chainlink CCIP leverages decentralized oracle networks to securely transfer data, enabling
                      cross-chain NFT minting. This facilitates the creation of highly interoperable and scalable NFT
                      projects.
                    </li>
                    <li>
                      For detailed information on deploying and configuring CCIP for cross-chain NFT minting, refer to
                      the{" "}
                      <a className="link" href="https://docs.chain.link/ccip/getting-started">
                        official Chainlink CCIP documentation.
                      </a>{" "}
                      This includes comprehensive guides on setting up contracts, testing, and managing cross-chain
                      operations.
                    </li>
                    <li>
                      Monitor your contract&apos;s LINK balance regularly, as sufficient funds are necessary for
                      cross-chain minting operations.
                    </li>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
