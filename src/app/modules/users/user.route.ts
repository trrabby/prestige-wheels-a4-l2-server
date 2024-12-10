import express from 'express';

import validateRequest from '../../MiddleWares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

router.get('/', UserControllers.AllUsers);

export const UserRoutes = router;
