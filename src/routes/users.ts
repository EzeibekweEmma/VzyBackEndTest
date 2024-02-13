import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import auth from '../middleware/auth';
import { editValidation } from '../utils/UserValidation';
import { capitalize } from '../utils/capitalize';
import { ZodError } from 'zod';

const router = express.Router();

router.put('/edit', auth, async (req: Request, res: Response) => {
  try {
    const { fullName } = editValidation.parse(req.body);
    if (!fullName) return res.status(400).send('fullName is required');

    // Check if the user exists
    const isExisting = await User.findOne({ _id: (req as any).user.id });
    if (!isExisting)
      return res.status(404).json({ message: 'Error: user not found!' });

    const updatedUser: Partial<IUser> = {};

    if (fullName)
      updatedUser.fullName = capitalize(
        fullName.trim().toLowerCase().replace(/\s+/g, ' ')
      );
    await User.findByIdAndUpdate(isExisting._id, updatedUser);
    res.status(200).send('User updated successfully');
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
