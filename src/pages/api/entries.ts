import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const client = await db.connect();

  //DROP TABLE Leaderboard;
  //DELETE FROM Leaderboard;

  switch (request.method) {

    case "GET":
        const list = await client.sql`
            SELECT * from Leaderboard ORDER by Score DESC, Timestamp ASC
        `;
        return response.status(200).json({ leaderboard: list });
        break;

   
    case "POST":
      await client.sql`DELETE FROM Leaderboard`;

      return response.status(200).json({ delete: true });
      break;
  }
}