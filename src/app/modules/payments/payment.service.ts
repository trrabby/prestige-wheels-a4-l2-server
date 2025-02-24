/* eslint-disable @typescript-eslint/no-explicit-any */

import config from '../../config';
import sslcz from '../../utils/SSLConfig';
import { OrderModel } from '../order/order.model';
import { PaymentModel } from './payment.model';
import mongoose from 'mongoose';

const generateTranId = (): string => {
  return `REF${Date.now()}${Math.floor(Math.random() * 100000)}`;
};

// Initialize Payment
export const initializePayment = async (data: any) => {
  const orderNo = data.orderData._id;
  const tran_id: string = generateTranId();
  data.tran_id = tran_id;
  data.success_url = `${config.url}/payments/success/${orderNo}?tran_id=${tran_id}`;
  data.fail_url = `${config.url}/payments/fail/${orderNo}`;
  data.cancel_url = `${config.url}/payments/cancel`;
  data.ipn_url = `${config.url}/payments/ipin`;

  const apiResponse = await sslcz.init(data);
  return apiResponse.GatewayPageURL;
};

// Process Payment Success
export const processPaymentSuccess = async (
  orderData: any,
  tran_id: string,
) => {
  const orderNo = orderData.id;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update the order with paymentStatus and orderStatus
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderNo },
      { paymentStatus: 'Paid', orderStatus: 'Confirmed' },
      { new: true, session }, // Ensure transaction is applied
    );

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    // Create a new Payment document using updated order data
    const transactionData = {
      ...updatedOrder.toObject(), // Convert to plain object to avoid Mongoose document issues
      orderNo,
      tran_id,
    } as any;
    delete transactionData._id;
    delete transactionData.createdAt;
    delete transactionData.updatedAt;

    await PaymentModel.create([transactionData], { session });
    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return `${config.frontend_url}/paymentSuccess/${orderNo}?trans_id=${tran_id}`;
  } catch (error) {
    // Rollback in case of error
    await session.abortTransaction();
    session.endSession();
    throw error; // Re-throw the error for handling
  }
};
// Process Payment Success
export const processPaymentFailed = async (orderData: any) => {
  const orderNo = orderData.id;
  // Update the order with paymentStatus and orderStatus
  const updatedOrder = await OrderModel.findOneAndUpdate(
    { _id: orderNo },
    { paymentStatus: 'Failed' },
    { new: true }, // Ensure transaction is applied
  );

  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return `${config.frontend_url}/paymentFailed?order_no=${orderNo}`;
};

// Get Payment Status
export const getPaymentStatus = async (tran_id: string) => {
  const transaction = await PaymentModel.findOne({ tran_id });
  if (!transaction) throw new Error('Transaction not found');
  return transaction;
};

export const paymentService = {
  initializePayment,
  processPaymentSuccess,
  getPaymentStatus,
  processPaymentFailed,
};
