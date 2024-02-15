import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import stripeWebhook from './routes/webhook';

dotenv.config();

const app = express();

// MongoDB connection setup
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Middleware setup
app.use(express.json());

// Routes setup
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/stripe', stripeWebhook);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
