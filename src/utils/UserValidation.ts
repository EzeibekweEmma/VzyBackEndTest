import { z } from 'zod';

export const RegisterValidation = z.object({
  fullName: z
    .string()
    .min(3, 'Name must be at least 3 character(s) long')
    .max(50, 'Name should not exceed 50 character(s)'),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 character(s) long')
    .refine((password) => {
      // Check if the password includes a number, uppercase, lowercase, and a special character
      const hasNumber = /\d/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasSpecialCharacter = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(
        password
      );

      return hasNumber && hasUppercase && hasLowercase && hasSpecialCharacter;
    }, 'Password must include a number, uppercase letter, lowercase letter, and a special character'),
});

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 character(s) long'),
});

export const editValidation = z.object({
  fullName: z
    .string()
    .min(3, 'Name must be at least 3 character(s) long')
    .max(50, 'Name should not exceed 50 character(s)'),
});
