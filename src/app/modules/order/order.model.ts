import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    car: { type: Schema.Types.ObjectId, required: true, ref: 'Cars' },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Shipped', 'Delivered'],
        message: `{VALUE} is not defined`,
      },
      required: true,
      default: 'Pending',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const OrderModel = model<TOrder>('Order', OrderSchema);
