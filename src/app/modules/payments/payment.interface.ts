import { Types } from 'mongoose';

export interface TPayment {
  tran_id: string;
  email: string;
  orderInfo: {
    productId: Types.ObjectId;
    orderedQuantity: number;
  }[];
  totalPrice: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Unpaid';
  orderStatus: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Canceled';
  customerInfo: {
    name: string;
    number: string;
    city: string;
    clolony: string;
    postOffice: string;
    subDistrict: string;
  };
}
