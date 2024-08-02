import * as React from "react";
//import { type WalletClient, useWalletClient } from 'wagmi';
//import { providers } from "ethers";

// TODO: is custom signer still broken?

/*
export function walletClientToSigner(walletClient: WalletClient) {
  const { chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  
  const provider = new providers.Web3Provider(transport, network);
  return provider;
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo( () => 
    (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}
*/