import { jwtDecode } from 'jwt-decode';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import customizedMsg from '../../utils/customisedMsg';
import { IUser } from '../users/user.interface';

// Function to create a new order
const orderCreateFun = catchAsync(async (req, res) => {
  const payload = req.body;
  payload['paymentStatus'] = 'Unpaid';
  payload['orderStatus'] = 'Pending';

  const result = await OrderService.postOrderDataIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Your order has been placed successfully`,
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

const updateAnOrderFun = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payLoad = req.body;

  const result = await OrderService.updateAnOrder(id, payLoad);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Order no ${id} has been ${result?.orderStatus}`,
    data: result,
  });
});

const getTotalRevenueFun = catchAsync(async (req, res) => {
  const result = await OrderService.getRevenue();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Total revenue retrieved successfully',
    data: result,
  });
});

const getMyOrdersFun = catchAsync(async (req, res) => {
  const tokenWithBearer = req.headers.authorization;
  let token;
  if (tokenWithBearer) {
    token = tokenWithBearer.split(' ')[1];
  }
  const user = jwtDecode(token!) as IUser;
  // console.log(user);
  const result = await OrderService.getMyOrders(req.query, user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result?.result, 'Orders'),
    data: result,
  });
});

export const orderController = {
  orderCreateFun,
  getAllOrdersFun,
  getAnOrderFun,
  updateAnOrderFun,
  getTotalRevenueFun,
  getMyOrdersFun,
};
