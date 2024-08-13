
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

// const ETHEREUM_PRIVATE_KEY = getEnv("NEXT_PUBLIC_PRIVATE_KEY")


// const client = await db.connect();1
//DROP TABLE Leaderboard;
  //DELETE FROM Leaderboard;
/*
  switch (request.method) {

    case "GET":
      try {
        const list = await client.sql`
            SELECT * from Leaderboard ORDER by Score DESC, Timestamp ASC
        `;
        return response.status(200).json({ leaderboard: list });
      } catch (error) {
        console.log("error getting entries", error)
        return response.status(500).json({ error });
      }

    case "POST":
      try {
        await client.sql`DELETE FROM Leaderboard`;
        return response.status(200).json({ delete: true });
      } catch (error) {
        console.log("error deleting", error)
        return response.status(500).json({ error });
      }
  }
*/