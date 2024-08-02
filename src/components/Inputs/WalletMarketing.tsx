import { ChangeEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type InputProps = {
  inputClassName?: string;
};
export const WalletMarketing: React.FC<InputProps> = ({ inputClassName }) => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!address) return;
    setWalletAddress(address);
  }, [address]);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(evt.target.value);
  };

  return (
    <input
      value={walletAddress}
      className={inputClassName}
      placeholder="Wallet Address (optional)"
      formNoValidate
      type="text"
      onChange={handleChange}
      name="wallet"
    />
  );
};
