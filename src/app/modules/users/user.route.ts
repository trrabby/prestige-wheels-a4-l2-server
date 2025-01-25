import express from 'express';

import { UserControllers } from './user.controller';
import auth from '../../MiddleWares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.AllUsers);

export const UserRoutes = router;
