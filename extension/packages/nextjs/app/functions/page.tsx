import React from "react";
// import SendFunction from "./_components/SendFunction";
import FulfillFunction from "./_components/ResultsFunction";
import GettingStarted from "~~/components/chainlink/GettingStarted";

const ChainlinkFunctions: React.FC = () => {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-8">🔧 Functions</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              {/* <SendFunction /> */}
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <FulfillFunction />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
            <GettingStarted
  introduction={
    "This page provides an example of how to implement and use Chainlink Functions to securely integrate off-chain data and computations into your smart contracts. Chainlink Functions allow developers to build decentralized applications (dApps) that can access external data sources and perform complex calculations while maintaining the security and decentralization of the blockchain."
  }
  steps={
    <>
      <li>
        Deploy <span className="font-bold">FunctionsConsumerExample.sol</span> on your desired network. Ensure the contract is properly configured to interact with Chainlink's decentralized oracle network (DON).
      </li>
      <li>
        Set up your Chainlink Function by defining the off-chain computation or data retrieval task you want to execute. This could involve fetching data from an API, performing calculations, or any other external process.
      </li>
      <li>
        Fund your smart contract with LINK tokens. These tokens are required to pay for the services provided by the Chainlink oracle network. You can acquire testnet LINK from the{" "}
        <a className="link" href="https://faucets.chain.link/">
          Chainlink Faucet
        </a>.
      </li>
      <li>
        Execute the function call from your smart contract to trigger the off-chain computation or data retrieval. The Chainlink oracle network will process the request and return the results to your contract.
      </li>
      <li>
        Monitor the transaction and verify the results returned by the Chainlink Function. You can use the{" "}
        <a className="link" href="https://functions.chain.link/">
          Chainlink Functions explorer
        </a>{" "}
        to track the status of your request and confirm the successful execution of the off-chain task.
      </li>
    </>
  }
  details={
    <>
      <li>
        Chainlink Functions empower smart contracts to securely interact with the real world by leveraging decentralized oracle networks. This expands the capabilities of dApps, enabling them to access and process external data seamlessly.
      </li>
      <li>
        For more details on integrating Chainlink Functions into your smart contracts, refer to the{" "}
        <a className="link" href="https://docs.chain.link/chainlink-functions/tutorials/simple-computation">
          official Chainlink Functions documentation.
        </a>{" "}
        This includes comprehensive guides on setting up your functions, testing them, and ensuring their secure execution.
      </li>
      <li>
        Be sure to monitor your contract’s LINK balance, as sufficient funds are required for the Chainlink oracle network to perform the off-chain computations and data retrievals.
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

export default ChainlinkFunctions;
