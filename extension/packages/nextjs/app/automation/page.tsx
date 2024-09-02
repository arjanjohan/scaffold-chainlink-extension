import React from "react";
import AutomationConsumer from "./_components/AutomationConsumer";
import AutomationEvents from "./_components/AutomationEvents";
import { Showcase } from "./_components/Showcase";
import GettingStarted from "~~/components/chainlink/GettingStarted";

const Automation = () => {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-8">🤖 Automation</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <AutomationConsumer />
            </div>
          </div>
          <div className="col-span-1 h-full">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg h-full">
              <AutomationEvents />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-base-100 p-6 rounded-3xl shadow-lg">
              <GettingStarted
                introduction={
                  <>
                    Chainlink Automation calls a smart contract function if a specified set of criteria are met. The{" "}
                    <a className="link" href="https://docs.chain.link/chainlink-automation/job-scheduler">
                      time-based trigger
                    </a>{" "}
                    calls a target function on a target contract every specified interval. The{" "}
                    <a className="link" href="https://docs.chain.link/chainlink-automation/register-upkeep">
                      custom logic trigger
                    </a>{" "}
                    allows your contract to use on-chain state to determine when to call a target function. The{" "}
                    <a className="link" href="https://docs.chain.link/chainlink-automation/log-trigger">
                      log trigger
                    </a>{" "}
                    allows your contract to use event log data as both a trigger and an input.
                  </>
                }
                steps={
                  <>
                    <li>
                      The{" "}
                      <a className="link" href="https://docs.chain.link/chainlink-automation/job-scheduler">
                        time-based trigger
                      </a>{" "}
                      does not require an interface.
                    </li>
                    <li>
                      The{" "}
                      <a className="link" href="https://docs.chain.link/chainlink-automation/register-upkeep">
                        custom logic trigger
                      </a>{" "}
                      requires your target contract be compatible with{" "}
                      <span className="font-bold">
                        <a
                          className="link"
                          href="https://docs.chain.link/chainlink-automation/reference/automation-interfaces#automationcompatibleinterface"
                        >
                          AutomationCompatibleInterface
                        </a>
                      </span>
                      .
                    </li>
                    <li>
                      The{" "}
                      <a className="link" href="https://docs.chain.link/chainlink-automation/log-trigger">
                        log trigger
                      </a>{" "}
                      requires your target contract be compatible with{" "}
                      <span className="font-bold">
                        <a
                          className="link"
                          href="https://docs.chain.link/chainlink-automation/reference/automation-interfaces#ilogautomation"
                        >
                          IlogAutomation
                        </a>
                      </span>
                      .
                    </li>
                  </>
                }
                details={
                  <>
                    <li>Decide which trigger fits best for your use case.</li>
                    <li>
                      Import the appropriate interface and <span className="font-bold">override</span> the{" "}
                      <span className="font-bold">checkUpkeep</span> and{" "}
                      <span className="font-bold">performUpkeep</span> functions inherited from the interface.
                    </li>
                    <li>
                      Register a new upkeep with Chainlink by providing your target contract address and depositing{" "}
                      <span className="font-bold">LINK</span> tokens.{" "}
                      <a className="link" href="https://automation.chain.link/sepolia/new">
                        Register here
                      </a>
                      .
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

export default Automation;
