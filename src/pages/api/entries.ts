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
}