import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import auth from '../middleware/auth';

const router = express.Router();

router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!email && !password)
      return res.status(400).send('Email or password is required');
    const updatedUser: Partial<IUser> = {};
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;
    await User.findByIdAndUpdate(id, updatedUser);
    res.status(200).send('User updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
