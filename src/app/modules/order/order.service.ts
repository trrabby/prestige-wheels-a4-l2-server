import mongoose from 'mongoose';
import AppError from '../../errorHandlers/AppError';
import { CarService } from '../car/car.service';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';

const orderSearchableFields = ['email', 'status'];

const postOrderDataIntoDB = async (orderData: TOrder) => {
  const {
    car: orderedCarId,
    quantity: orderedCarQty,
    ...otherOrderData
  } = orderData;

  const carData = await CarService.getACar(orderedCarId as unknown as string);

  if (!carData.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Car could not be found in the database.',
    );
  }

  const car = carData[0];

  if (car.quantity < 1) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Stock unavailable. Please choose another product.',
    );
  }

  const qtyAfterOrder = car.quantity - orderedCarQty;

  if (qtyAfterOrder < 0) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Ordered quantity exceeds available stock.',
    );
  }

  const inStock = qtyAfterOrder > 0;
  const updatedCarData = {
    quantity: qtyAfterOrder,
    inStock,
  };

  const completeOrderData = {
    ...otherOrderData,
    car: orderedCarId,
    quantity: orderedCarQty,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create order
    const orderResult = await OrderModel.create([completeOrderData], {
      session,
    });

    // Update car stock in the database
    await CarService.updateACarData(
      orderedCarId as unknown as string,
      updatedCarData,
      session,
    );

    await session.commitTransaction(); // Commit the transaction if everything goes well
    session.endSession();

    return orderResult;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction(); // Rollback changes if an error occurs
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Something Went wrong'); // Re-throw the error for proper error handling
  }
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const ordersQuery = new QueryBuilder(OrderModel.find(), query)
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ordersQuery.modelQuery
    .sort({ _id: -1 })
    .populate({
      path: 'car', // The field to populate
      select: 'brand model year', // Fields to select from the populated document
    })
    .select('-__v'); // Optionally exclude fields from the main document (e.g., exclude `__v`)

  const meta = await ordersQuery.countTotal();

  return { meta, result };
};

const getAnOrder = async (id: string) => {
  const result = await OrderModel.find({ _id: id }).populate({
    path: 'car', // The field to populate
    select: 'brand model year', // Fields to select from the populated document
  });
  return result;
};

const getRevenue = async () => {
  const totalRevenuePipeline = [
    {
      $group: {
        _id: null, // Grouping all documents together
        totalRevenue: {
          $sum: {
            $multiply: ['$quantity', '$totalPrice'], // Calculate revenue per order
          },
        },
        noOfCarsSold: {
          $sum: '$quantity', // Sum up the quantity to get the total cars sold
        },
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field in the result
        totalRevenue: 1,
        noOfCarsSold: 1, // Include the total number of cars sold
      },
    },
  ];

  const result = await OrderModel.aggregate(totalRevenuePipeline);
  return result;
};

export const OrderService = {
  postOrderDataIntoDB,
  getAllOrders,
  getAnOrder,
  getRevenue,
};
