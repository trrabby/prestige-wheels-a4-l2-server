/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errorHandlers/AppError';
import { TUser } from './user.interface';
import { UserModel } from './user.mode';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
  //set default user role

  payload.role = 'user';

  try {
    // create a user
    const newUser = await UserModel.create(payload);
    //create a student
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    return newUser;
  } catch (err: any) {
    throw new Error(err);
  }
};

const findAllUsers = async () => {
  const result = UserModel.find().sort({ _id: -1 });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  findAllUsers,
};
