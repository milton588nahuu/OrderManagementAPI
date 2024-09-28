import mongoose from 'mongoose';
import {
    Products
} from '../interfaces/Northwin';
import {
    products
} from '../models/models.Northwin';
/**
 * Creates a new products in the database.
 *
 * @param product The products data to create.
 * @returns The newly created products object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function prodCreator(product: Products): Promise<Products | null> {
    try {
        const createdProduct = await products.create(product);
        return createdProduct;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('Error creating');
    }

}
/**
 * Retrieves all products from the database.
 *
 * @returns An array of product objects, or rejects with an error if there's an issue retrieving products.
 */
async function prodShow() {
    try {
        const findAllProduct = await products.find();
        return findAllProduct;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error showing all');
    }

}
/**
 * Updates an existing products in the database.
 *
 * @param _id The ID of the products to update.
 * @param product The updated products data.
 * @returns The updated products object, null if the products is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function prodUpdate(_id: string, product: Products): Promise<Products | null> {
    try {
        
        const updataProduct = await products.findByIdAndUpdate({ _id }, { $set: product }, { new: true });
        return updataProduct;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error("error updating");
    }
    
}
/**
 * Deletes a product from the database.
 *
 * @param _id The ID of the product to delete.
 * @returns The deleted product object, null if the product is not found, or rejects with an error if there's an issue deleting the product.
 */
async function prodDelete(_id: string): Promise<Products | null> {
    try {
        
        const deleteProduct = await products.findByIdAndDelete({ _id });
        return deleteProduct;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error when deleting');
    }
    
}
/**
 * Retrieves a specific product by its ID.
 *
 * @param _id The ID of the product to retrieve.
 * @returns The product object, null if the product is not found, or rejects with an error if there's an issue retrieving the product.
 */
async function prodShowByID(_id: string) {
    try {
    
        const findProductById = await products.findById({ _id });
        return findProductById;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error when displaying');
    }
    
}

export {
    prodCreator,
    prodShow,
    prodUpdate,
    prodDelete,
    prodShowByID
}