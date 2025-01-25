import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import customizedMsg from '../../utils/customisedMsg';

const AllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.findAllUsers(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result?.result, 'Users'),
    data: result,
  });
});

export const UserControllers = {
  AllUsers,
};
