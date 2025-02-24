import express from 'express';
import {
  initPayment,
  paymentFailed,
  PaymentModel,
  paymentSuccess,
} from './payment.controller';
import auth from '../../MiddleWares/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.post('/init', initPayment); // Start payment
router.post('/success/:id', paymentSuccess); // Handle success response from SSLCOMMERZ
router.post('/fail/:id', paymentFailed);
router.get('/', auth(USER_ROLE.admin), PaymentModel.getAllpaymentsFun);
router.get(
  '/:tran_id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PaymentModel.getAPaymentFun,
);

export const paymentRoute = router;
