/* eslint-disable @typescript-eslint/no-explicit-any */
import { CarService } from './car.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import customizedMsg from '../../utils/customisedMsg';

// Function to create a new car

const carCreateFun = catchAsync(async (req, res) => {
  const payload = req.body;
  payload['isDeleted'] = false;

  const result = await CarService.postCarDataIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Car's Data created successfully`,
    data: result,
  });
});

// Function to get all cars by a search term

const getAllCarFun = catchAsync(async (req, res) => {
  const result = await CarService.getAllCars(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: customizedMsg(result?.result, 'Cars'),
    data: result,
  });
});

const updateACarFun = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CarService.updateACarData(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Car's Data Updated Successfully`,
    data: result,
  });
});

// Function to delete a car
const deleteACarFun = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.deleteACarData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted Successfully',
    data: result,
  });
});

// Function to get a single car
const getACarFun = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.getACar(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Retrived Successfully',
    data: result,
  });
});

export const carController = {
  carCreateFun,
  getAllCarFun,
  getACarFun,
  updateACarFun,
  deleteACarFun,
};
