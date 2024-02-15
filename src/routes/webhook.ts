import express, { Request, Response } from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';
import auth from '../middleware/auth';

dotenv.config();

const stripeWebhook = express.Router();
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

stripeWebhook.post('/payment', async (req: Request, res: Response) => {
  const session = await stripeClient.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:${process.env.PORT}/api/stripe/success`,
    cancel_url: `http://localhost:${process.env.PORT}/api/stripe/cancel`,
  });

  res.send({ url: session.url });
});

stripeWebhook.get('/success', (req: Request, res: Response) => {
  res.json({ message: 'Payment successful' });
});

stripeWebhook.get('/cancel', (req: Request, res: Response) => {
  res.json({ message: 'Payment cancelled' });
});

export default stripeWebhook;
