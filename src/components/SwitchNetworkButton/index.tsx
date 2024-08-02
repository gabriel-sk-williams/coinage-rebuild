import { PropsWithChildren, useEffect } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { Button } from "../Actions";
import { useChainModal } from "@rainbow-me/rainbowkit";

const ChangeChainButton: React.FC = () => {
  const { openChainModal } = useChainModal();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain?.id !== 1 && switchNetwork) {
      switchNetwork(1);
    }
  }, [chain, switchNetwork]);

  return (
    <Button
      modifier="primary"
      onClick={openChainModal}
      type="button">
      Wrong network
    </Button>
  );
};

export default ChangeChainButton;

export const WrapMintButtonWithChangeChain: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { chain } = useNetwork();

  if (chain?.unsupported) {
    return <ChangeChainButton />;
  }
  return <>{children}</>;
};
