import mongoose from 'mongoose';
import {
  OrderDetails
} from '../interfaces/Northwin';
import {
  orderdetails
} from '../models/models.Northwin';

/**
 * Creates a new oderdetails in the database.
 *
 * @param oderdetail The oderdetails data to create.
 * @returns The newly created oderdetails object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function ordDetailsCreator(orderdetail: OrderDetails): Promise<OrderDetails | null> {
  try {
    const createdOrderDetails = await orderdetails.create(orderdetail);
    return createdOrderDetails;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    }
    throw new Error('Error creating');
  }

}
/**
 * Retrieves all oderdetails from the database.
 *
 * @returns An array of oderdetail objects, or rejects with an error if there's an issue retrieving oderdetails.
 */
async function ordDetailsShow() {
  try {
    const findAllOrderDetails = await orderdetails.find();
    return findAllOrderDetails;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    }
    throw new Error('error showing all');
  }

}
/**
 * Updates an existing oderdetails in the database.
 *
 * @param _id The ID of the oderdetails to update.
 * @param orderdetail The updated oderdetails data.
 * @returns The updated oderdetails object, null if the oderdetails is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function ordDetailsUpdate(_id: string, orderdetail: OrderDetails): Promise<OrderDetails | null> {
  try {
    
    const updataOrderDetails = await orderdetails.findByIdAndUpdate({ _id }, { $set: orderdetail }, { new: true });
    return updataOrderDetails;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    }
    throw new Error("error updating");
  }

}
/**
 * Deletes a oderdetail from the database.
 *
 * @param _id The ID of the oderdetail to delete.
 * @returns The deleted oderdetail object, null if the oderdetail is not found, or rejects with an error if there's an issue deleting the oderdetail.
 */
async function ordDetailsDelete(_id: string): Promise<OrderDetails | null> {
  try {
    
    const deleteOrderDetails = await orderdetails.findByIdAndDelete({ _id });
    return deleteOrderDetails
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    }
    throw new Error('error when deleting');
  }
}
/**
 * Retrieves a specific oderdetail by its ID.
 *
 * @param _id The ID of the oderdetail to retrieve.
 * @returns The oderdetail object, null if the oderdetail is not found, or rejects with an error if there's an issue retrieving the oderdetail.
 */
async function ordDetailsShowByID(_id: string) {
  try {
   
    const findOrderDetailsById = await orderdetails.findById({ _id });
    return findOrderDetailsById;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    }
    throw new Error('error when displaying');
  }
}

export {
  ordDetailsCreator,
  ordDetailsShow,
  ordDetailsUpdate,
  ordDetailsDelete,
  ordDetailsShowByID
}


