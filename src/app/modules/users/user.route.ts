import express from 'express';

import validateRequest from '../../MiddleWares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../MiddleWares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

router.get('/', auth(USER_ROLE.admin), UserControllers.AllUsers);

export const UserRoutes = router;
