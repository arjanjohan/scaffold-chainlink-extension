import React from "react";
import Link from "next/link";
import { NextPage } from "next";

const Extension: NextPage = () => {
  return (
    <div className="min-h-screen max-w-[1200px] mx-auto flex flex-col items-center justify-center">
      {/* Header Section */}

      <div className="container text-center w-full mt-16">
        <h1 className="text-3xl sm:text-6xl font-bold">Scaffold-ETH Chainlink Extension</h1>
      </div>

      {/* Hero Section */}
      <section id="overview" className="container mx-auto text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Cross-Chain Interoperability Made Simple</h2>
        <p className="text-lg mb-8">
          Implement secure cross-chain token transfers, messaging, and NFT minting using Scaffold-ETH and Chainlink.
        </p>
        <div className="space-x-4">
          <a href="https://github.com/KcPele/chainlink-ccip-starterkit" className="btn btn-primary text-white px-6 py-3 rounded shadow">
            View on GitHub
          </a>
          <a href="#getstarted" className="bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-900">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="flex flex-wrap justify-around">
          <Link
            href="/token-transfer"
            className="hover:scale-[1.1] transition-all w-80 bg-white p-6 shadow-lg rounded-lg text-center mb-8"
          >
            <h4 className="text-2xl font-bold mb-4">🔄 Token Transfers</h4>
            <p>Transfer tokens securely across different blockchains using Chainlink CCIP.</p>
          </Link>
          <Link
            href="/cross-chain-messaging"
            className="hover:scale-[1.1] transition-all w-80 bg-white p-6 shadow-lg rounded-lg text-center mb-8"
          >
            <h4 className="text-2xl font-bold mb-4">✉️ Cross-Chain Messaging</h4>
            <p>Send and receive data across multiple blockchains seamlessly.</p>
          </Link>
          <Link
            href="/cross-chain-minting"
            className="hover:scale-[1.1] transition-all w-80 bg-white p-6 shadow-lg rounded-lg text-center mb-8"
          >
            <h4 className="text-2xl font-bold mb-4">🖼️ NFT Minting</h4>
            <p>Mint NFTs on any destination chain via cross-chain requests.</p>
          </Link>
          <Link
            href="/vrf"
            className="hover:scale-[1.1] transition-all  w-80 bg-white p-6 shadow-lg rounded-lg text-center mb-8"
          >
            <h4 className="text-2xl font-bold mb-4">🎲 Chainlink VRF</h4>
            <p>Generate and verify randomness securely using Chainlink VRF.</p>
          </Link>
          <Link
            href="/functions"
            className="hover:scale-[1.1] transition-all w-80 bg-white p-6 shadow-lg rounded-lg text-center mb-8"
          >
            <h4 className="text-2xl font-bold mb-4">🔧 Chainlink Functions</h4>
            <p>Execute off-chain computations and data retrievals using Chainlink Functions.</p>
          </Link>
          <Link
            href="/automation"
            className="hover:scale-[1.1] transition-all w-80 bg-white p-6 shadow-lg rounded-lg text-center mb-8"
          >
            <h4 className="text-2xl font-bold mb-4">🤖 Chainlink Automation</h4>
            <p>Automate contract executions and tasks seamlessly with Chainlink Automation.</p>
          </Link>
          <Link
            href="/price-feed"
            className="hover:scale-[1.1] transition-all w-80 bg-white p-6 shadow-lg rounded-lg text-center mb-8"
          >
            <h4 className="text-2xl font-bold mb-4">📈 Data feeds</h4>
            <p>Connect your smart contracts to the real-world data such as asset prices.</p>
          </Link>
        </div>
      </section>

      {/* Setup Section */}
      <section id="getstarted" className="container max-w-xl  mx-auto py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Getting Started</h3>
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h4 className="text-2xl font-bold mb-4">🔄 Token Transfers</h4>
          <p className="mb-6">
            Chainlink CCIP allows secure and efficient transfer of tokens across different blockchains. Using the Token
            Transfer feature, you can initiate a token transfer from one blockchain to another by specifying the
            destination chain, token address, amount, and receiver address.
          </p>

          <h4 className="text-2xl font-bold mb-4">✉️ Cross-Chain Messaging</h4>
          <p className="mb-6">
            Chainlink CCIP supports sending and receiving arbitrary data across chains. The Cross-Chain Messaging
            feature enables you to transmit important information or commands from one blockchain to another, ensuring
            reliable cross-chain communication.
          </p>

          <h4 className="text-2xl font-bold mb-4">🖼️ Cross-Chain NFT Minting</h4>
          <p className="mb-6">
            With Chainlink CCIP, you can mint NFTs on a destination chain via cross-chain requests. The Cross-Chain NFT
            Minting feature allows you to trigger NFT creation on another blockchain, expanding the reach and utility of
            your digital assets.
          </p>

          <h4 className="text-2xl font-bold mb-4">🎲 Chainlink VRF</h4>
          <p className="mb-6">
            Chainlink VRF (Verifiable Random Function) provides a secure and verifiable way to generate randomness
            on-chain. This is essential for applications requiring unbiased random outcomes, such as lotteries, gaming,
            and NFT distributions.
          </p>

          <h4 className="text-2xl font-bold mb-4">🔧 Chainlink Functions</h4>
          <p className="mb-6">
            Chainlink Functions enable smart contracts to retrieve data and execute off-chain computations securely.
            This allows your contracts to leverage external data sources and perform complex calculations without
            leaving the blockchain ecosystem.
          </p>

          <h4 className="text-2xl font-bold mb-4">🤖 Chainlink Automation</h4>
          <p className="mb-6">
            Chainlink Automation automates the execution of smart contracts and recurring tasks. By using Automation,
            developers can ensure their contracts are executed at precise intervals or under specific conditions without
            manual intervention.
          </p>
          <h4 className="text-2xl font-bold mb-4">📈 Data feeds</h4>
          <p className="mb-6">
            Chainlink Data Feeds are the quickest way to connect your smart contracts to the real-world data such as
            asset prices, reserve balances, and L2 sequencer health.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Extension;
