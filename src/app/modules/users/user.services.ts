/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errorHandlers/AppError';
import { userSearchableFields } from './user.constant';
import { IUser } from './user.interface';

import { UserModel } from './user.model';

const registerNewUserIntoDB = async (payload: IUser) => {
  //set default user role
  payload.role = 'user';

  // console.log(payload);

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

const findAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    result,
    meta,
  };
};

export const UserServices = {
  registerNewUserIntoDB,
  findAllUsers,
};
