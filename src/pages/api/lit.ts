import { NextApiRequest, NextApiResponse } from 'next';
import { LIT_RPC } from "@lit-protocol/constants";
import * as ethers from "ethers";
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  
    switch (request.method) {
        case "GET":
            try {
                const ETHEREUM_PRIVATE_KEY = process.env.PRIVATE_KEY || "";

                const ethersWallet = new ethers.Wallet(
                  ETHEREUM_PRIVATE_KEY,
                  new ethers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE),
                );

                const walletJson = ethersWallet.encryptSync("nurbs")

                return response.status(200).json({ encryptedWallet: walletJson });
            } catch(error) {
                console.log(error)
            }

    }
}