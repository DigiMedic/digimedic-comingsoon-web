import { NextApiRequest, NextApiResponse } from 'next';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const record = await pb.collection('CRM').create({ email });
      res.status(200).json({ message: 'Email úspěšně přidán do CRM.' });
    } catch (error) {
      console.error('Chyba při přidávání do CRM:', error);
      res.status(500).json({ message: 'Nastala chyba při zpracování požadavku.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}