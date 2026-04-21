import React from "react";

const NotAvaliable = () => {
    return (
        <div
            className="h-screen flex flex-col 
    items-center space-y-4 justify-center"
        >
            <div className="flex-1 flex flex-col items-center">
                <span className="text-6xl" aria-hidden>
                    :(
                </span>
                <h2 className="text-xl font-semibold">
                    This Form is no longer available
                </h2>
                <a
                    href="/"
                    className="mt-4 min-w-64 rounded-md bg-primary px-4 py-2 text-center text-white"
                >
                    Learn more
                </a>
            </div>

            <div
                className="shrink-0 
      min-h-14 text-center"
            >
                <p className="text-xs">Company by</p>
                <h5
                    className="font-black 
         text-[20px] text-primary"
                >
                    {" "}
                    Formy.ai
                </h5>
            </div>
        </div>
    );
};

export default NotAvaliable;