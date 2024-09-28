import mongoose from 'mongoose';
import {
    Shippers
} from '../interfaces/Northwin';
import { 
    shippers
} from '../models/models.Northwin';
/**
 * Creates a new shippers in the database.
 *
 * @param shipper The shippers data to create.
 * @returns The newly created shippers object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function shippCreator(shipper:Shippers):Promise<Shippers|null>{
    try {
        const createdShipper = await shippers.create(shipper);
        return  createdShipper;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('Error creating');
    }
    
}
/**
 * Retrieves all shippers from the database.
 *
 * @returns An array of shipper objects, or rejects with an error if there's an issue retrieving shippers.
 */
async function shippShow():Promise<Shippers[]>{
    try {
        const findAllShipper = await shippers.find();
        return findAllShipper;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('error showing all');
    }
    
}
/**
 * Updates an existing shippers in the database.
 *
 * @param _id The ID of the shippers to update.
 * @param shipper The updated shippers data.
 * @returns The updated shippers object, null if the shippers is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function shippUpdate(_id:string,shipper:Shippers):Promise<Shippers|null>{
   try {
    const updateShipper = await shippers.findByIdAndUpdate({_id},{$set:shipper},{new:true});
    return updateShipper;
   } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
        console.error(error);
        throw new Error(`Validation error: ${error.message}`);
      }
      throw new Error("error updating");
   }
     
}
/**
 * Deletes a shipper from the database.
 *
 * @param _id The ID of the shipper to delete.
 * @returns The deleted shipper object, null if the shipper is not found, or rejects with an error if there's an issue deleting the shipper.
 */
async function shippDelete(_id:string):Promise<Shippers|null>{
    try {
        const deleteShipper = await shippers.findByIdAndDelete({_id});
        return deleteShipper;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('error when deleting');
    }
}
/**
 * Retrieves a specific shipper by its ID.
 *
 * @param _id The ID of the shipper to retrieve.
 * @returns The shipper object, null if the shipper is not found, or rejects with an error if there's an issue retrieving the shipper.
 */
async function shippShowByID(_id:string){
    try {
        const findShipperById = await shippers.findById({_id});
        return findShipperById;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          }
          throw new Error('error when displaying');
    }
}

export {
    shippCreator,
    shippShow,
    shippDelete,
    shippShowByID,
    shippUpdate
}