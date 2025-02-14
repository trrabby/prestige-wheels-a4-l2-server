import { Types } from 'mongoose';

export type TOrder = {
  email: string;
  orderInfo: [
    {
      productId: Types.ObjectId;
      orderedQuantity: number;
    },
  ];
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  customerInfo: {
    name: string;
    number: string;
    city: string;
    clolony: string;
    postOffice: string;
    subDistrict: string;
  };
};
