import express from 'express';
import { carController } from './car.controller';
import validateRequest from '../../MiddleWares/validateRequest';
import { carValidations } from './car.validation';
import auth from '../../MiddleWares/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.post(
  '/create-car',
  validateRequest(carValidations.carValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user),
  carController.carCreateFun,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  carController.getAllCarFun,
);

router.patch(
  '/:id',
  validateRequest(carValidations.carUpdateValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user),
  carController.updateACarFun,
);

router.put(
  '/delete-car/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  carController.deleteACarFun,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  carController.getACarFun,
);

export const carRoutes = router;
