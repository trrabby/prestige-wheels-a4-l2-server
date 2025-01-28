import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import customizedMsg from '../../utils/customisedMsg';

const registerUser = catchAsync(async (req, res) => {
  const data = JSON.parse(req.body.data);
  const imgUrl = req.file?.path;

  // console.log({ data, imgUrl }); // For debugging purposes

  const user = await UserServices.registerNewUserIntoDB({
    ...data,
    imgUrl,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: user,
  });
});

export { registerUser };

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
  registerUser,
  AllUsers,
};
