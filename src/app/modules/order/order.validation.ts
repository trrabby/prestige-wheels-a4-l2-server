import { z } from 'zod';

export const orderValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address.'),
    orderInfo: z.array(
      z.object({
        productId: z.string().min(1, 'Product ID is required.'),
        orderedQuantity: z
          .number()
          .positive('Product quantity must be greater than 0.'),
      }),
    ),
    totalPrice: z.number().positive('Total price must be greater than 0.'),
    customerInfo: z.object({
      name: z.string().min(1, 'Name is required.'),
      number: z.string().min(1, 'Number is required.'),
      city: z.string().min(1, 'City is required.'),
      clolony: z.string().min(1, 'Colony is required.'),
      postOffice: z.string().min(1, 'Post office is required.'),
      subDistrict: z.string().min(1, 'Sub-district is required.'),
    }),
  }),
});

export default orderValidationSchema;
