import express from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../MiddleWares/validateRequest';
import orderValidationSchema from './order.validation';
import auth from '../../MiddleWares/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.post(
  '/order-car',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(orderValidationSchema),
  orderController.orderCreateFun,
);

router.get('/', auth(USER_ROLE.admin), orderController.getAllOrdersFun);

router.get(
  '/revenue',
  auth(USER_ROLE.admin),
  orderController.getTotalRevenueFun,
);

router.get('/:orderId', auth(USER_ROLE.admin), orderController.getAnOrderFun);

export const orderRoute = router;
