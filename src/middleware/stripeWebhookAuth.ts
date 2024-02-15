import { NextFunction, Request, Response } from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

async function stripeWebhookAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripeClient.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookSecret
    );
    req['stripeEvent'] = event;
    next();
  } catch (err) {
    console.error('Error verifying webhook signature:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}

export default stripeWebhookAuth;
