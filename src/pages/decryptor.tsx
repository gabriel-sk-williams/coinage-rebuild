import React, { useState, useEffect, KeyboardEvent } from 'react';
import type { NextPage } from 'next';
import {Button, ConnectButton} from '../components/Actions';


import Logo from '../assets/CoinageLogo.svg';
import NextLink from 'next/link';
import { Link } from '../components/Actions';


import { LitNetwork, LIT_RPC } from "@lit-protocol/constants";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import * as ethers from "ethers";

import { useWalletClient } from 'wagmi';
import { clientToSigner, useEthersSigner} from '../hooks/useEthers';

const Decryptor: NextPage = () => {

  const [flagged, setFlagged] = useState<boolean>(false);
  const { data: walletClient } = useWalletClient({ chainId: 1 }) // wagmi
  const signer = walletClient ? clientToSigner(walletClient) : undefined; // custom

    const getEnv = (name: string): string => {
      const env = process.env.NEXT_PUBLIC_PRIVATE_KEY
      if (env === undefined || env === "")
        throw new Error(
          `${name} ENV is not defined, please define it in the .env file`
        );
      return env;
    };

    const buyNFT = async () => {
      
      const ETHEREUM_PRIVATE_KEY = getEnv("NEXT_PUBLIC_PRIVATE_KEY")

      /*
      const ethersWallet = new ethers.Wallet(
        ETHEREUM_PRIVATE_KEY,
        new ethers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE),
      );
      */

      let contractClient = new LitContracts({
        signer: signer,
        network: LitNetwork.DatilTest,
      });
      
      await contractClient.connect();

      // this identifier will be used in delegation requests. 
      const { capacityTokenIdStr } = await contractClient.mintCapacityCreditsNFT({
        requestsPerKilosecond: 80,
        // requestsPerDay: 14400,
        // requestsPerSecond: 10,
        daysUntilUTCMidnightExpiration: 2,
      });

      console.log(capacityTokenIdStr)
      
    }

    const testId = "98532386193349680896387282491461182577532572929429136750516241794000016421328";

    const devId = "74661787941637129475395307775655400703507912494651389885743213621278522974536";

    return (
      <div>
        <header>
        <div className="max-w-[1200px] mx-auto flex flex-wrap p-4 px-6 pt-6 items-center justify-between gap-8 ">
          <NextLink href="https://www.coinage.media/">
            <Logo />
          </NextLink>

          <div className="hidden tab:flex mr-auto w-128"/>

          <div className={"hidden tab:flex flex-row"}>
            <div className="flex gap-2 justify-end">
              {/*"flex gap-2 items-center justify-end"*/}
                <Link
                  className={""} ///*tab:!max-w-none tab:!w-auto*/
                  modifier={flagged ? 'flagged' : 'secondary'}
                  href="https://www.coinage.media/about#mint">
                  {"MINT"}
                </Link>

              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

        <div className="flex flex-col items-center text-center justify-between">
            <div className="pt-4">
                <Button modifier="secondary" onClick={buyNFT}>
                BUY NFT
                </Button>
            </div>
        </div>
      </div>
    )
}

export default Decryptor