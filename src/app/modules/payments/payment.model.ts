import { Schema, model, Types } from 'mongoose';
import { TPayment } from './payment.interface';

const PaymentSchema = new Schema<TPayment>(
  {
    tran_id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    orderInfo: [
      {
        productId: { type: Types.ObjectId, required: true, ref: 'Cars' },
        orderedQuantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Unpaid'],
      required: true,
      default: 'Unpaid',
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled'],
      required: true,
      default: 'Pending',
    },
    customerInfo: {
      name: { type: String, required: true },
      number: { type: String, required: true },
      city: { type: String, required: true },
      clolony: { type: String, required: true },
      postOffice: { type: String, required: true },
      subDistrict: { type: String, required: true },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const PaymentModel = model<TPayment>('Payment', PaymentSchema);
