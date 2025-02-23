import express from 'express';
import {
  getPaymentStatus,
  initPayment,
  paymentSuccess,
} from './payment.controller';

const router = express.Router();

router.post('/init', initPayment); // Start payment
router.post('/success/:id', paymentSuccess); // Handle success response from SSLCOMMERZ
router.get('/status', getPaymentStatus); // Fetch payment status from DB

export const paymentRoute = router;
