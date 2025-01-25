/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import customizedMsg from '../../utils/customisedMsg';

// Function to create a new order
const orderCreateFun = catchAsync(async (req, res) => {
  const payload = req.body;
  payload['status'] = 'Pending';

  const result = await OrderService.postOrderDataIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Car's Data created successfully`,
    data: result,
  });
});

const getAllOrdersFun = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result?.result, 'Orders'),
    data: result,
  });
});

const getAnOrderFun = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderService.getAnOrder(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order's Data retrieved successfully",
    data: result,
  });
});

const getTotalRevenueFun = catchAsync(async (req, res) => {
  const result = await OrderService.getRevenue();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order's Data retrieved successfully",
    data: result,
  });
});

export const orderController = {
  orderCreateFun,
  getAllOrdersFun,
  getAnOrderFun,
  getTotalRevenueFun,
};
