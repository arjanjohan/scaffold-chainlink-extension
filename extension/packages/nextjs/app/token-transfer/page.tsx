import React from "react";
import TokenReceiver from "./_components/TokenReceiver";
import TokenSender from "./_components/TokenSender";

const TokenTransfersDocumentation: React.FC = () => {
  return (
    <div>
      {/* TOKEN Section */}
      <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-16">
        <div className="z-10">
          <h2 className="text-2xl font-bold mb-4 text-center">TOKEN</h2>
          <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
            <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
              <div className="flex items-center justify-center space-x-2">
                <p className="my-0 text-sm">Sender</p>
              </div>
            </div>
            <div className="p-5 divide-y divide-base-300">
              <TokenSender />
            </div>
          </div>
        </div>
        <div className="z-10">
          <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
            <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
              <div className="flex items-center justify-center space-x-2">
                <p className="my-0 text-sm">Receiver</p>
              </div>
            </div>
            <div className="p-5 divide-y divide-base-300">
              <TokenReceiver />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTransfersDocumentation;
