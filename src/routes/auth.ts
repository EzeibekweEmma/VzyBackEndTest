import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { LoginValidation, RegisterValidation } from '../utils/UserValidation';
import { capitalize } from '../utils/capitalize';
import { ZodError } from 'zod';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = RegisterValidation.parse(req.body);

    // Check if the user already exists
    const isExisting = await User.findOne({ email });
    if (isExisting)
      return res.status(409).json({ message: 'Error: user already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName: capitalize(fullName.trim().toLowerCase().replace(/\s+/g, ' ')),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    // Handle validation error
    if (err instanceof ZodError) {
      console.error('Validation error:', err.errors);
      return res
        .status(400)
        .json({ [err.errors[0].path[0]]: err.errors[0].message });
    }
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    let { email, password } = LoginValidation.parse(req.body);

    email = email.toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid credentials');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send('Invalid credentials');
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1m',
      }
    );
    res.json({ token });
  } catch (err) {
    // Handle validation error
    if (err instanceof ZodError) {
      console.error('Validation error:', err.errors);
      return res
        .status(400)
        .json({ [err.errors[0].path[0]]: err.errors[0].message });
    }
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
