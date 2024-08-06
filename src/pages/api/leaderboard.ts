import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const client = await db.connect();

  /*
  try {
    await client.sql`
    CREATE TABLE Leaderboard ( 
        Address varchar(255), 
        Score smallint, 
        Timestamp varchar(255) UNIQUE
        );
    `;
  } catch (error) {
    console.log("Leaderboard table already created")
    return response.status(500).json({ error });
  }
  */

  switch (request.method) {

    case "GET":
      try {
      const list = await client.sql`
        SELECT * FROM (
          SELECT DISTINCT ON (Address) Address, Score, Timestamp
          FROM (
              SELECT * From Leaderboard
              ORDER BY Address, Score DESC, Timestamp ASC
          ) l1
        ) l2
        ORDER BY Score DESC, Timestamp ASC
      `;
      return response.status(200).json({ leaderboard: list });
    } catch (error) {
      console.log("error getting", error)
      return response.status(500).json({ error });
    }

    case "POST":
      console.log("posting")
      try {
        await client.sql`INSERT INTO Leaderboard (Address, Score, Timestamp) VALUES (
          ${request.body.address}, 
          ${request.body.score},
          ${request.body.timestamp}
        );`;
        return response.status(200).json({ ok: true });
      } catch (error) {
        console.log("error posting", error)
      return response.status(500).json({ error });
      }
  }
}