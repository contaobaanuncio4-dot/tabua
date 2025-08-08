import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

app.post('/api/create-pix', async (req, res) => {
  try {
    const apiKey = process.env.BLACKCAT_AUTH_BASE64;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing BLACKCAT_AUTH_BASE64 env var' });
    }

    const { amount, items, customer } = req.body;

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

    return res.json(response.data);
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status || 500).json({ error: error.response.data || 'Upstream error' });
    }
    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});