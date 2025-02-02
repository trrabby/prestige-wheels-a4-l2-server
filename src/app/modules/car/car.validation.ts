import { z } from 'zod';

const carValidationSchema = z.object({
  brand: z.string().min(1, { message: 'Brand is required.' }),
  model: z.string().min(1, { message: 'Model is required.' }),
  year: z
    .number()
    .int()
    .min(1886, { message: 'Year must be 1886 or later.' })
    .max(new Date().getFullYear(), {
      message: 'Year cannot be in the future.',
    })
    .nonnegative({ message: 'Year must be a positive number.' }),
  price: z.number().positive({ message: 'Price must be a positive number.' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: () => {
      return {
        message: `Currently allowed categories are Sedan, SUV, Truck, Coupe, Convertible. If you need to add any other category pl notify developer`,
      };
    },
  }),
  imgUrl: z.array(z.string()),
  description: z.string().min(1, { message: 'Description is required.' }),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer.' })
    .nonnegative({ message: 'Quantity cannot be negative.' }),
  inStock: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const carUpdateValidationSchema = z.object({
  body: z.object({
    brand: z.string().min(1, { message: 'Brand is required.' }).optional(),
    model: z.string().min(1, { message: 'Model is required.' }).optional(),
    year: z
      .number()
      .int()
      .min(1886, { message: 'Year must be 1886 or later.' })
      .max(new Date().getFullYear(), {
        message: 'Year cannot be in the future.',
      })
      .nonnegative({ message: 'Year must be a positive number.' })
      .refine((val) => !isNaN(val), {
        message: 'Year must be a valid number.',
      })
      .optional(),
    price: z
      .number()
      .positive({ message: 'Price must be a positive number.' })
      .optional(),
    category: z
      .enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
        errorMap: () => {
          return {
            message: `Invalid category. Allowed values are Sedan, SUV, Truck, Coupe, Convertible.`,
          };
        },
      })
      .optional(),
    description: z
      .string()
      .min(1, { message: 'Description is required.' })
      .optional(),
    quantity: z
      .number()
      .int({ message: 'Quantity must be an integer.' })
      .nonnegative({ message: 'Quantity cannot be negative.' })
      .optional(),
    inStock: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const carValidations = {
  carValidationSchema,
  carUpdateValidationSchema,
};
