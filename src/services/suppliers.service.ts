import mongoose from 'mongoose';
import {
    Suppliers
} from '../interfaces/Northwin';
import {
    suppliers
} from '../models/models.Northwin';
/**
 * Creates a new suppliers in the database.
 *
 * @param supplier The suppliers data to create.
 * @returns The newly created suppliers object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function suppCreator(supplier: Suppliers): Promise<Suppliers | null> {
    try {
        const createdSupplier = await suppliers.create(supplier);
        return createdSupplier;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('Error creating');
    }
    
}
/**
 * Retrieves all suppliers from the database.
 *
 * @returns An array of supplier objects, or rejects with an error if there's an issue retrieving suppliers.
 */
async function suppShow(): Promise<Suppliers[]> {
    try {
        const findAllSuppliers = await suppliers.find();
        return findAllSuppliers;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error showing all');
    }
    
}
/**
 * Updates an existing suppliers in the database.
 *
 * @param _id The ID of the suppliers to update.
 * @param supplier The updated suppliers data.
 * @returns The updated suppliers object, null if the suppliers is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function suppUpdate(_id: string, supplier: Suppliers): Promise<Suppliers | null> {
    try {
       
        const updataSupplier = await suppliers.findByIdAndUpdate({ _id }, { $set: supplier }, { new: true });
        return updataSupplier;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error("error updating");
    }
     
}
/**
 * Deletes a supplier from the database.
 *
 * @param _id The ID of the supplier to delete.
 * @returns The deleted supplier object, null if the supplier is not found, or rejects with an error if there's an issue deleting the supplier.
 */
async function suppDelete(_id: string): Promise<Suppliers | null> {
    try {
       
        const deleteSupplier = await suppliers.findByIdAndDelete({ _id });
        return deleteSupplier;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error when deleting');
    }

}
/**
 * Retrieves a specific supplier by its ID.
 *
 * @param _id The ID of the supplier to retrieve.
 * @returns The supplier object, null if the supplier is not found, or rejects with an error if there's an issue retrieving the supplier.
 */
async function suppShowByID(_id: string) {
    try {
       
        const findSupplerById = await suppliers.findById({ _id });
        return findSupplerById;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error when displaying');
    }
    
}

export {
    suppCreator,
    suppShow,
    suppDelete,
    suppShowByID,
    suppUpdate
}