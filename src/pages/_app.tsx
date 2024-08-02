import '../styles/globals.css';
import '../styles/typography.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import {RainbowTheme} from '../styles/rainbowTheme';
import dynamic from 'next/dynamic';
/*
import { configureChains, WagmiConfig, createConfig} from 'wagmi'; //mainnet, 
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';
import {createPublicClient, http } from 'viem';
import { mainnet, goerli, sepolia } from 'viem/chains';
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';

const client = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const Page = dynamic(() => import('../components/Page'), {ssr: false});
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={RainbowTheme}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

/*
const { chains } = configureChains(
  [mainnet, goerli, sepolia], 
  [
    alchemyProvider({apiKey: '7TeGPWfnykf7FIEfDtDYzGfgkZTkVpYg'}),
    publicProvider()
  ]
);

const {connectors} = getDefaultWallets({
  appName: 'Coinage',
  projectId: '3c07bcacc60df8ec9ce8b3ebf53ccc1e',
  chains,
});

const client = createConfig({
  autoConnect: true,
  connectors,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
});

function App({Component, pageProps}: AppProps) {
  const Page = dynamic(() => import('../components/Page'), {ssr: false});

  return (
    <WagmiConfig config={client}>
      <RainbowKitProvider theme={RainbowTheme} chains={chains}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
*/