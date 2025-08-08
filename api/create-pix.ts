import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.BLACKCAT_AUTH_BASE64;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing BLACKCAT_AUTH_BASE64 env var' });
    }

    const { amount, items, customer } = req.body || {};

    if (!amount || !items || !customer) {
      return res.status(400).json({ error: 'amount, items and customer are required' });
    }

    const response = await axios.post(
      'https://api.blackcatpagamentos.com/v1/transactions',
      {
        amount,
        currency: 'BRL',
        paymentMethod: 'pix',
        items,
        customer,
      },
      {
        headers: {
          accept: 'application/json',
          authorization: `Basic ${apiKey}`,
          'content-type': 'application/json',
        },
      }
    );

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status || 500).json({ error: error.response.data || 'Upstream error' });
    }
    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
}