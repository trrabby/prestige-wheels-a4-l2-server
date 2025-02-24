import express from 'express';
import {
  initPayment,
  paymentFailed,
  paymentSuccess,
} from './payment.controller';

const router = express.Router();

router.post('/init', initPayment); // Start payment
router.post('/success/:id', paymentSuccess); // Handle success response from SSLCOMMERZ
router.post('/fail/:id', paymentFailed);

export const paymentRoute = router;
