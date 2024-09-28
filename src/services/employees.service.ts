import mongoose, { isValidObjectId } from 'mongoose';
import {
    Employees
} from '../interfaces/Northwin';
import {
    employees
} from '../models/models.Northwin';
/**
 * Creates a new employees in the database.
 *
 * @param employee The employees data to create.
 * @returns The newly created employees object, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function empCreator(employee: Employees): Promise<Employees | null> {
    try {
        const createdEmployee = await employees.create(employee);
        return createdEmployee;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('Error creating');
    }

}
/**
 * Retrieves all employees from the database.
 *
 * @returns An array of employee objects, or rejects with an error if there's an issue retrieving employees.
 */
async function empShow(): Promise<Employees[]> {
    try {
        const findAllEmployees = await employees.find();
        return findAllEmployees;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error showing all');
    }
}
/**
 * Updates an existing employees in the database.
 *
 * @param _id The ID of the employees to update.
 * @param employee The updated employees data.
 * @returns The updated employees object, null if the employees is not found, or rejects with an error if validation fails or an unexpected issue occurs.
 */
async function empUpdate(_id: string, employee: Employees): Promise<Employees | null> {
    try {
       
        const updataEmployee = await employees.findByIdAndUpdate({ _id }, { $set: employee }, { new: true });
        return updataEmployee;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error("error updating");
    }
}
/**
 * Deletes a employee from the database.
 *
 * @param _id The ID of the employee to delete.
 * @returns The deleted employee object, null if the employee is not found, or rejects with an error if there's an issue deleting the employee.
 */
async function empDelete(_id: string): Promise<Employees | null> {
    try {
        const deleteEmployee = await employees.findByIdAndDelete({ _id });
        return deleteEmployee;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error when deleting');
    }

}
/**
 * Retrieves a specific employee by its ID.
 *
 * @param _id The ID of the employee to retrieve.
 * @returns The employee object, null if the employee is not found, or rejects with an error if there's an issue retrieving the employee.
 */
async function empShowByID(_id: string) {
    try {
       
        const findEmployeeById = await employees.findById({ _id });
        return findEmployeeById;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            throw new Error(`Validation error: ${error.message}`);
        }
        throw new Error('error when displaying');
    }
}

export {
    empCreator,
    empShow,
    empDelete,
    empShowByID,
    empUpdate
}