import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function ManulHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis();

    // no dependecy array: run anytime something re-renders
    // CAREFUL with this!! Because then you can get circular render
    // blank dependency array, run once on load / rerender
    // dependencies in the array, run anytime something in there changes

    //Here when user connect using wallet, isWeb3Enabled returns true and if he disconnect it returns false.
    // If it return true, we don't do anything, but if it returns false, we show connected button.
    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3();
            }
        }
        //
    }, [isWeb3Enabled]);

    //This uses Moralis onAccount changed event to check if account is changed. If user disconnect, that mean we have no account.
    // If no account it mean we will remove the localstorgae that remember our connection.
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account Changed to ${account}`);
            if (account == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3();
                console.log("No account found");
            }
        });
    }, []);

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3();
                        //lets store the connection information in browser localstorage
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected");
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    );
}
