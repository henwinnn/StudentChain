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
  nim: z
    .string()
    .trim()
    .min(5, { message: 'NIM must be at least 5 characters' })
    .max(12, { message: 'NIM must be at most 12 characters' }),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  country: z.string().trim().min(1, { message: 'Country is required' }),
  age: z.coerce
    .number({
      // Gunakan z.coerce.number untuk konversi otomatis dari string input HTML
      invalid_type_error: 'Age must be a number',
    })
    .int({ message: 'Age must be an integer' })
    .min(18, { message: 'Age must be at least 1' })
    .max(100, { message: 'Age seems too high' }),
  major: z.string().trim().min(1, { message: 'Major is required' }),
  gender: z.enum(['Man', 'Woman'], {
    // Opsi 'man' dan 'woman' yang valid
    required_error: 'Gender is required', // Pesan error jika tidak dipilih
    invalid_type_error: 'Please select a valid gender', // Pesan error jika nilai tidak sesuai enum
  }),
  uri: z
    .string()
    .trim()
    .min(1, { message: 'URI is required' })
    .url()
    .describe('metadata URI'),
});

export type AddStudentSchema = z.infer<typeof addStudentSchema>;
