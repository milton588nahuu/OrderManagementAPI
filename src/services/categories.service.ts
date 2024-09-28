import mongoose, { Error, isValidObjectId} from 'mongoose';
import {
  Categories
} from '../interfaces/Northwin';
import {
  categories
} from '../models/models.Northwin';
/**
 * Creates a new category in the database.
 * @param category The category data to create.
 * @returns The newly created category object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function categCreator(category: Categories): Promise<Categories> {
  try {
    const createdCategory = await categories.create(category);
    return createdCategory;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError){
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    } 
    throw new Error('Error creating');
  }
}

/**
 * Retrieves all categories from the database.
 *
 * @returns An array of category objects, or rejects with an error if there's an issue retrieving categories.
 */
async function categShow(): Promise<Categories[]> {
  try {
    const allCategories = await categories.find();
    return allCategories;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError){
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    } 
    throw new Error('error showing all');
  }
}

/**
 * Updates an existing category in the database.
 *
 * @param _id The ID of the category to update.
 * @param category The updated category data.
 * @returns The updated category object, null if the category is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function categUpdate(_id: string, category: Categories): Promise<Categories | null> {
  try {
    if (!isValidObjectId(_id)) {
      throw new Error('Invalid Id');
    }
    const updateCategory = await categories.findByIdAndUpdate({ _id }, { $set: category }, { new: true });
    return updateCategory;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError){
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    } 
    throw new Error("error updating");
  }
}

/**
 * Deletes a category from the database.
 *
 * @param _id The ID of the category to delete.
 * @returns The deleted category object, null if the category is not found, or rejects with an error if there's an issue deleting the category.
 */
async function categDelete(_id: string): Promise<Categories | null> {
  try {
    const deleteCategory = await categories.findByIdAndDelete({ _id });
    return deleteCategory;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError){
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    } 
    throw new Error('error when deleting');
  }
}

/**
 * Retrieves a specific category by its ID.
 *
 * @param _id The ID of the category to retrieve.
 * @returns The category object, null if the category is not found, or rejects with an error if there's an issue retrieving the category.
 */
async function categShowByID(_id: string): Promise<Categories | null> {
  try {
    const findCategorybyId = await categories.findById({ _id });
    return findCategorybyId;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError){
      console.error(error);
      throw new Error(`Validation error: ${error.message}`);
    } 
    throw new Error('error when displaying');
  }
}

export {
  categCreator,
  categShow,
  categDelete,
  categShowByID,
  categUpdate
}

