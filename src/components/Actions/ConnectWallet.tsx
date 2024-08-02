import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./";
import SwitchNetworkButton from "../SwitchNetworkButton";
import { useEffect, useState } from "react";
import { ButtonModifiers } from "./shared";


const DisplayName: React.FC<any> = ({ account }) => {
  /*
  const [unstoppableDomain, setUnstoppableDomains] = useState(null);

  useEffect(() => {
    const checkUnstoppable = async () => {
      const data = await fetch(
        `https://resolve.unstoppabledomains.com/reverse/${account.address}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNSTOPPABLE_KEY}`
          },
          method: "GET"
        }
      );

      const { meta } = await data.json();

      if (meta.domain !== "") {
        setUnstoppableDomains(meta.domain);
      }
    };

    checkUnstoppable();
  }, [account.address]);

  if (account.ensName) return account.ensName;
  if (unstoppableDomain) return unstoppableDomain;
  */
  return account.displayName;
  
};

const WalletConnect: React.FC<{
  buttonText?: string;
  hideWhenConnected?: boolean;
  className?: string;
  modifier?: ButtonModifiers;
}> = ({
  hideWhenConnected,
  className,
  modifier = "primary",
  buttonText = "Connect Wallet"
}) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none"
              }
            })}>
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    className={className}
                    modifier={modifier}
                    onClick={openConnectModal}
                    type="button">
                    {buttonText}
                  </Button>
                );
              }
              if (chain.unsupported) {
                return <SwitchNetworkButton />;
              }
              if (hideWhenConnected) return null;
              return (
                <div className="flex items-center">
                  <Button
                    modifier="tertiary"
                    onClick={openAccountModal}
                    type="button">
                    <DisplayName account={account} />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;
