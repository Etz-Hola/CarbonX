import { z } from 'zod';

export const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address');

export const tradeSchema = z.object({
  tokenId: z.string().min(1, 'Token ID is required'),
  amount: z.number().min(0.001, 'Minimum amount is 0.001'),
  slippage: z.number().min(0.1).max(10, 'Slippage must be between 0.1% and 10%'),
});

export const stakeSchema = z.object({
  tokenId: z.string().min(1, 'Token ID is required'),
  amount: z.number().min(0.001, 'Minimum stake amount is 0.001'),
  lockPeriod: z.enum(['30', '90', '180', '365']),
});

export const retirementSchema = z.object({
  tokenId: z.string().min(1, 'Token ID is required'),
  amount: z.number().min(0.001, 'Minimum retirement amount is 0.001'),
  beneficiary: z.string().optional(),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
});

export const profileSchema = z.object({
  currency: z.enum(['USD', 'EUR', 'INR']),
  language: z.enum(['en', 'es', 'hi']),
  notifications: z.boolean(),
  publicProfile: z.boolean(),
  theme: z.enum(['light', 'dark']),
});

export const validateInput = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: string[] } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => err.message),
      };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};