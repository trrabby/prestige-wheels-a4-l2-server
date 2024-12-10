import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import customizedMsg from '../../utils/customisedMsg';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserServices.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const AllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.findAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result, 'Users'),
    data: result,
  });
});

export const UserControllers = {
  createUser,
  AllUsers,
};
