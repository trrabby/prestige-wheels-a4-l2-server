import express from 'express';
import { carController } from './car.controller';
import validateRequest from '../../MiddleWares/validateRequest';
import { carValidations } from './car.validation';
import auth from '../../MiddleWares/auth';
import { USER_ROLE } from '../users/user.constant';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post(
  '/create-car',
  multerUpload.array('files', 5),
  auth(USER_ROLE.admin),
  carController.carCreateFun,
);

router.get('/', carController.getAllCarFun);

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
