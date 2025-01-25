import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';

import { UserModel } from './user.model';

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
  findAllUsers,
};
