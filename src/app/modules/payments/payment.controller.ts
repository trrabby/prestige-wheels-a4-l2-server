import { paymentService } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Initialize Payment
export const initPayment = catchAsync(async (req, res) => {
  const paymentUrl = await paymentService.initializePayment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment initialization successful',
    data: { paymentUrl },
  });
});

// Handle Payment Success
export const paymentSuccess = catchAsync(async (req, res) => {
  const result = await paymentService.processPaymentSuccess(req.params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment successful and recorded',
    data: result,
  });
});

// Get Payment Status
export const getPaymentStatus = catchAsync(async (req, res) => {
  const transaction = await paymentService.getPaymentStatus(
    req.query.tran_id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment status retrieved successfully',
    data: transaction,
  });
});

export const PaymentModel = {
  initPayment,
  paymentSuccess,
  getPaymentStatus,
};
