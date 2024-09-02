import RequestRandomNumber from "./_components/RequestRandomNumber";
import ViewRandomNumbers from "./_components/ViewRandomNumbers";
import GettingStarted from "~~/components/chainlink/GettingStarted";

const Page: React.FC = () => {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-8">🎲 Random Number Generator</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <RequestRandomNumber />
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <ViewRandomNumbers />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <GettingStarted
                introduction={
                  "This page demonstrates how to use the Chainlink VRF contract. The contract is funded directly with LINK tokens."
                }
                steps={
                  <>
                    <li>
                      Fund the contract with enough LINK. Use the
                      <a className="link" href="https://faucets.chain.link/">
                        Chainlink Faucet
                      </a>{" "}
                      and send the LINK tokens to contract.
                    </li>
                    <li>
                      Submit a request for randomness. The default values are defined in{" "}
                      <span className="font-bold">packages/nextjs/app/vrf/_components/RequestRandomNumber.tsx</span>.
                      Modify them if needed.
                    </li>
                    <li>
                      In the view component, hit the refesh button to get the latest random number. To request random
                      numbers that are generated before, fill in the <span className="font-bold">Request ID</span> and
                      refresh.
                    </li>
                  </>
                }
                details={
                  <>
                    <li>
                      The <span className="font-bold">RandomNumberDirectFundingConsumerV2Plus</span> uses directfunding.
                      Check out the{" "}
                      <a className="link" href="https://docs.chain.link/vrf/v2-5/overview/direct-funding">
                        Chainlink documentation for more details.{" "}
                      </a>{" "}
                    </li>

                    <li>
                      The request will be fulfilled after a predetermined number of blocks have been confirmed. The{" "}
                      <span className="font-bold">View Random Numbers</span> component fetches the random number from
                      the contract.
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

export default Page;
