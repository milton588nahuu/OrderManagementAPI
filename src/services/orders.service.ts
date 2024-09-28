import mongoose from 'mongoose';
import {
  Orders  
} from '../interfaces/Northwin';
import { 
  orders
} from '../models/models.Northwin';

/**
 * Creates a new orders in the database.
 *
 * @param order The orders data to create.
 * @returns The newly created orders object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function ordCreator(order:Orders):Promise<Orders|null>{
    try {
        const createdOrder = await orders.create(order);
        return createdOrder;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('Error creating');
    }
     
}
/**
 * Retrieves all orders from the database.
 *
 * @returns An array of order objects, or rejects with an error if there's an issue retrieving orders.
 */
async function ordShow(){
    try {
        const findOrderAll = await orders.find();
        return findOrderAll;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('error showing all');
    }
}
/**
 * Updates an existing orders in the database.
 *
 * @param _id The ID of the orders to update.
 * @param order The updated orders data.
 * @returns The updated orders object, null if the orders is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function ordUpdate(_id:string,order:Orders):Promise<Orders|null>{
    try {
        const updataOrder = await orders.findByIdAndUpdate({_id},{$set:order},{new:true});
        return updataOrder;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error("error updating");
    }
    
}
/**
 * Deletes a order from the database.
 *
 * @param _id The ID of the order to delete.
 * @returns The deleted order object, null if the order is not found, or rejects with an error if there's an issue deleting the order.
 */
async function ordDelete(_id:string):Promise<Orders|null>{
    try {
       
        const deleteOrder = await orders.findByIdAndDelete({_id});
        return deleteOrder;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('error when deleting');
    }
    
}
/**
 * Retrieves a specific order by its ID.
 *
 * @param _id The ID of the order to retrieve.
 * @returns The order object, null if the order is not found, or rejects with an error if there's an issue retrieving the order.
 */
async function ordShowByID(_id:string){
    try {
       
        const findOrderAll = await  orders.findById({_id});
        return findOrderAll;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('error when displaying');  
    }
   
}

export {
    ordCreator,
    ordShow,
    ordUpdate,
    ordDelete,
    ordShowByID
}