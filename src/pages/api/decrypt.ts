import { NextApiRequest, NextApiResponse } from 'next';
import * as CryptoJS from 'crypto-js';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
  ) {
    
      switch (request.method) {
        case "POST":
          try {
            var eString = request.body.eString
            //var secret = process.env.SECRET as string
            
            const decryptedString = CryptoJS.AES.decrypt(eString, "gigas").toString(CryptoJS.enc.Utf8);
            return response.status(200).json({ decryptedString: decryptedString });
          } catch(error) {
              console.log(error)
          }
      }
  }