import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TCar } from './car.interface';
import { CarModel } from './car.model';

export const carSearchableFields = [
  'brand',
  'model',
  'category',
  'description',
];

const postCarDataIntoDB = async (carData: TCar) => {
  const result = await CarModel.create(carData);
  return result;
};

const getAllCars = async (query: Record<string, unknown>) => {
  const carsQuery = new QueryBuilder(CarModel.find(), query)
    .search(carSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carsQuery.modelQuery.sort({ _id: -1 }).find({
    $or: [
      { isDeleted: { $exists: false } }, // Documents where `isDeleted` does not exist
      { isDeleted: false }, // Documents where `isDeleted` is explicitly false
    ],
  });
  const meta = await carsQuery.countTotal();

  return { meta, result };
};

const updateACarData = async (
  id: string,
  payload: Partial<TCar>,
  session?: mongoose.ClientSession, // Optional session parameter for transactions came from the controller.
) => {
  const result = await CarModel.findOneAndUpdate(
    { _id: id }, // Match the document where the id matches
    payload, // Apply the update
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
      session: session || undefined, // Included session if provided
    },
  );
  return result;
};

const deleteACarData = async (id: string) => {
  const result = await CarModel.findOneAndUpdate(
    { _id: id }, // Match the document where the email matches
    { $set: { isDeleted: true } }, // Add the field `isDeleted` and set it to true
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    },
  );
  return result;
};

const getACar = async (id: string) => {
  const result = await CarModel.find({ _id: id });
  return result;
};
export const CarService = {
  postCarDataIntoDB,
  getAllCars,
  updateACarData,
  deleteACarData,
  getACar,
};
