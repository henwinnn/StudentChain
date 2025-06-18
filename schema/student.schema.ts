import { isAddress } from 'viem';
import { z } from 'zod';

export const addStudentSchema = z.object({
  address: z
    .string()
    .trim()
    .refine(
      (val) => {
        try {
          return isAddress(val);
        } catch {
          return false;
        }
      },
      {
        message: 'Invalid wallet address',
      },
    ),
  nim: z.string().trim().min(5).max(12),
  name: z.string().trim().min(1, { message: 'Name is too short' }),
  major: z.string().trim().min(1, { message: 'Major is required' }),
  uri: z
    .string()
    .trim()
    .min(1, { message: 'URI is required' })
    .url()
    .describe('metadata URI'),
});

export type AddStudentSchema = z.infer<typeof addStudentSchema>;
