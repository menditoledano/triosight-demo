import { z } from 'zod';

export const patientFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    age: z
        .number()
        .min(1, 'Age is required')
        .min(18, 'Patient must be at least 18 years old')
        .max(120, 'Invalid age'),
    gender: z
        .string()
        .min(1, 'Gender is required'),
    dateOfBirth: z
        .string()
        .optional(),
    bloodType: z
        .string()
        .optional(),
    height: z
        .string()
        .optional(),
    weight: z
        .string()
        .optional(),
    allergies: z
        .array(z.string())
        .optional(),
    medications: z
        .array(z.string())
        .optional(),
});

export const strategyUpdateSchema = z.object({
    patientId: z.string().min(1, 'Patient ID is required'),
    strategy: z.enum(['A', 'B', 'C']).refine((val) => ['A', 'B', 'C'].includes(val), {
        message: 'Please select a valid strategy',
    }),
    score: z
        .number()
        .min(0, 'Score must be at least 0')
        .max(10, 'Score must not exceed 10')
        .optional(),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
export type StrategyUpdateData = z.infer<typeof strategyUpdateSchema>;

