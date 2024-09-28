import mongoose from 'mongoose';
import {
    Customers
} from '../interfaces/Northwin';
import { 
    customers
} from '../models/models.Northwin';
/**
 * Creates a new customers in the database.
 *
 * @param customers The customers data to create.
 * @returns The newly created customers object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function custCreator(customer:Customers):Promise<Customers|null>{
    try {
        const createdCustomer = await customers.create(customer);
        return createdCustomer
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('Error creating');
    }
}


/**
 * Retrieves all customers from the database.
 *
 * @returns An array of customer objects, or rejects with an error if there's an issue retrieving customers.
 */
async function custShow(){
    try {
        const allCustomers = await customers.find();
        return allCustomers
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error showing all');
    }

}

/**
 * Updates an existing customers in the database.
 *
 * @param _id The ID of the customers to update.
 * @param customer The updated customers data.
 * @returns The updated customers object, null if the customers is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function custUpdate(_id:string,customer:Customers):Promise<Customers|null>{
    try {
        const updateCustomer =await customers.findByIdAndUpdate({_id},{$set:customer},{new:true});
        return updateCustomer;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
          } 
          throw new Error("error updating");
    }
}

/**
 * Deletes a customer from the database.
 *
 * @param _id The ID of the customer to delete.
 * @returns The deleted customer object, null if the customer is not found, or rejects with an error if there's an issue deleting the customer.
 */
async function custDelete(_id:string):Promise<Customers|null>{
    try {
    
      const deleteCustomer = await customers.findByIdAndDelete({_id});
      return deleteCustomer;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError){
        console.error(error);
        throw new Error(`Validation error: ${error.message}`);
      } 
      throw new Error("error when deleting");
    }

}

/**
 * Retrieves a specific customer by its ID.
 *
 * @param _id The ID of the customer to retrieve.
 * @returns The customer object, null if the customer is not found, or rejects with an error if there's an issue retrieving the customer.
 */
async function custShowByID(_id:string):Promise<Customers|null>{
    try {
        const findCustomerById = customers.findById({_id});
        return findCustomerById;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError){
        console.error(error);
        throw new Error(`Validation error: ${error.message}`);
      } 
      throw new Error("error finding");
    }
}

export {
    custCreator,
    custShow,
    custUpdate,
    custDelete,
    custShowByID
}