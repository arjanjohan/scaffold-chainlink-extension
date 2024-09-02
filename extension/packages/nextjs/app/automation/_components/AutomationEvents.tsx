"use client";

import { useEffect, useState } from "react";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldEventHistory, useScaffoldWatchContractEvent } from "~~/hooks/scaffold-eth/";

type EventData = {
  timestamp: bigint | undefined;
  blockNumber: bigint;
  counter: bigint | undefined;
};

const AutomationEvents: React.FC = () => {
  const contractName = "AutomationConsumer";
  const { data: contract } = useScaffoldContract({ contractName });

  const [events, setEvents] = useState<EventData[]>([]);

  useScaffoldWatchContractEvent({
    contractName: contractName,
    eventName: "UpkeepPerformed",
    onLogs: logs => {
      logs.forEach(log => {
        console.log("LOG", log);
        const { timestamp, counter } = log.args;

        const blockNumber = log.blockNumber;
        if (timestamp && counter && blockNumber) {
          setEvents((prevEvents: EventData[]) => {
            const updatedEvents: EventData[] = [
              ...prevEvents,
              {
                timestamp: typeof timestamp === "bigint" ? timestamp : (timestamp as bigint),
                blockNumber: BigInt(blockNumber),
                counter: typeof counter === "bigint" ? counter : (counter as bigint),
              },
            ];

            // Sort the events array based on the timestamp
            return updatedEvents.sort((a: EventData, b: EventData) => {
              if (a.timestamp && b.timestamp) {
                return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
              }
              return 0;
            });
          });
        }
      });
    },
  });

  const { data: eventsData, isLoading: isLoadingEvents } = useScaffoldEventHistory({
    contractName: contractName,
    eventName: "UpkeepPerformed",
    fromBlock: 31231n,
  });

  useEffect(() => {
    if (!events?.length && !!eventsData?.length && !isLoadingEvents) {
      setEvents(
        eventsData.map(({ args, log }) => {
          return {
            timestamp: args.timestamp,
            blockNumber: log.blockNumber,
            counter: args.counter,
          };
        }) || [],
      );
    }
  }, [events.length, eventsData, isLoadingEvents]);

  // console.log("eventsData", eventsData);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col bg-base-100 px-6 py-4 text-center items-center rounded-3xl">
        <h2 className="text-2xl font-bold">Automation Events</h2>

        <Address address={contract?.address} />
        <div className="mb-4 mt-4">
          <div className="h-full">
            <div className="overflow-x-auto overflow-y-auto h-full hide-scrollbar ">
              <table className="table table-pin-rows">
                <thead className="text-lg">
                  <tr className=" rounded-xl">
                    <th>Timestamp</th>
                    <th>Block</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {events.map((event, idx) => (
                    <tr key={idx} className="border-b border-base-100">
                      <td>{event.timestamp ? new Date(Number(event.timestamp) * 1000).toLocaleTimeString() : "N/A"}</td>
                      <td>{event.blockNumber ? event.blockNumber.toString() : "N/A"}</td>
                      <td>{event.counter ? event?.counter?.toString() : "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationEvents;
