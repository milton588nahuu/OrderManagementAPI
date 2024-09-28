import { Suppliers } from "../../../src/interfaces/Northwin";

import { suppCreator, suppDelete, suppShow, suppUpdate } from '../../../src/services/suppliers.service'
import { suppFilter } from '../../../src/services/filters.service';
import { suppliers } from "../../../src/models/models.Northwin";
jest.mock('../../../src/models/models.Northwin');

describe('suppliers', () => {

    it('should insert a doc into collection', async () => {
        const mockSupplier: Suppliers = {
            supplierID: 1,
            supplierName: "Exotic Liquid",
            contactName: "Charlotte Cooper",
            address: "49 Gilbert St.",
            city: "Londona",
            postalCode: "EC1 4SD",
            country: "UK",
            phone: "(171) 555-2222"
        }
       suppliers.create = jest.fn().mockResolvedValue(mockSupplier);
        const result = await suppCreator(mockSupplier);
        expect(result).toEqual(mockSupplier);
        expect(suppliers.create).toHaveBeenCalledWith(mockSupplier);
    });

    it('should handle errors from supplier create', async () => {
        const mockSupplier: Suppliers = {
            supplierID: 1,
            supplierName: "Exotic Liquid",
            contactName: "Charlotte Cooper",
            address: "49 Gilbert St.",
            city: "Londona",
            postalCode: "EC1 4SD",
            country: "UK",
            phone: "(171) 555-2222"
        }

       suppliers.create = jest.fn().mockRejectedValue(mockSupplier);
        await expect(suppCreator(mockSupplier)).rejects.toThrow('Error');
    });

    it('should show all documents', async () => {
        const mockSupplier: Suppliers = {
            supplierID: 1,
            supplierName: "Exotic Liquid",
            contactName: "Charlotte Cooper",
            address: "49 Gilbert St.",
            city: "Londona",
            postalCode: "EC1 4SD",
            country: "UK",
            phone: "(171) 555-2222"
        }
       suppliers.find = jest.fn().mockReturnValue(mockSupplier);
        const result = await suppShow();
        expect(suppliers.find()).toEqual(result);
    });

    it('should return null', async () => {
        const mockOrders = [{}];
       suppliers.find = jest.fn().mockReturnValue(mockOrders);
        const result = await suppShow();
        expect(suppliers.find()).toEqual(result);
    });

    it('It should return the updated', async () => {
        const _id = '66b99eba6e91031827f6e3c0';
        const mockSupplier: Suppliers = {
            supplierID: 1,
            supplierName: "Exotic Liquid",
            contactName: "Charlotte Cooper",
            address: "49 Gilbert St.",
            city: "Londona",
            postalCode: "EC1 4SD",
            country: "UK",
            phone: "(171) 555-2222"
        }
       suppliers.findByIdAndUpdate = jest.fn().mockReturnValue({ _id, ...mockSupplier });
        const result = await suppUpdate(_id, mockSupplier);
        expect(suppliers.findByIdAndUpdate()).toEqual(result);
    });

    it('Should return an error when updating', async () => {
        const _id = '66b99eba6e91031827f6';
        const mockSupplier: Suppliers = {
            supplierID: 1,
            supplierName: "Exotic Liquid",
            contactName: "Charlotte Cooper",
            address: "49 Gilbert St.",
            city: "Londona",
            postalCode: "EC1 4SD",
            country: "UK",
            phone: "(171) 555-2222"
        }
       suppliers.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(_id);
        await expect(suppUpdate(_id, mockSupplier)).rejects.toThrow("error updating");
    });


    it('Should return the supplier deleted', async () => {
        const _id = '66b99eba6e91031827f6';
        const mockSupplier = {
            _id,
            employeeID: 1,
            firstName: "Nancy",
            lastName: "Davolio",
            birthdate: "1968-12-08",
            photo: "EmpID1.pic",
            notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
        }
       suppliers.findByIdAndDelete = jest.fn().mockReturnValue(mockSupplier);
        const result = await suppDelete(_id);
        expect(suppliers.findByIdAndDelete()).toEqual(result);
    });

    it('must reject the promise to eliminate', async () => {
        const _id = '66b99eba6e91031827f6';
       suppliers.findByIdAndDelete = jest.fn().mockRejectedValue(_id);
        await expect(suppDelete(_id)).rejects.toThrow("error when deleting");
    });


    it('a single supplier must return', async () => {

        const mockSupplier: Suppliers = {
            supplierID: 1,
            supplierName: "Exotic Liquid",
            contactName: "Charlotte Cooper",
            address: "49 Gilbert St.",
            city: "Londona",
            postalCode: "EC1 4SD",
            country: "UK",
            phone: "(171) 555-2222"
        }

       suppliers.find = jest.fn().mockReturnValue(mockSupplier);
        const results = await suppFilter(mockSupplier);
        expect(suppliers.find()).toEqual(results);
    })

    it('filtering error', async () => {

        const mockSupplier: Suppliers = {
            supplierID: 1,
            supplierName: "Exotic Liquid",
            contactName: "Charlotte Cooper",
            address: "49 Gilbert St.",
            city: "Londona",
            postalCode: "EC1 4SD",
            country: "UK",
            phone: "(171) 555-2222"
        }

       suppliers.find = jest.fn().mockRejectedValue(mockSupplier);
        expect(suppFilter(mockSupplier)).rejects.toThrow("impossible to filter");
    })


});





