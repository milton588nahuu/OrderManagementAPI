import { Products } from "../../../src/interfaces/Northwin"

import { prodCreator, prodDelete, prodShow, prodUpdate } from '../../../src/services/products.service'
import { prodFilter, suppFilter } from '../../../src/services/filters.service';
import { products } from "../../../src/models/models.Northwin";

jest.mock('../../../src/models/models.Northwin');

describe.skip('products', () => {

    it('should insert a doc into collection', async () => {
        const mockProduct: Products = {
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }
        products.create = jest.fn().mockResolvedValue(mockProduct);
        const result = await prodCreator(mockProduct);
        expect(result).toEqual(mockProduct);
        expect(products.create).toHaveBeenCalledWith(mockProduct);
    });

    it('should handle errors from product create', async () => {
        const mockProduct: Products = {
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }

        products.create = jest.fn().mockRejectedValue(mockProduct);
        await expect(prodCreator(mockProduct)).rejects.toThrow('Error');
    });

    it('should show all documents', async () => {
        const mockProduct: Products = {
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }
        products.find = jest.fn().mockReturnValue(mockProduct);
        const result = await prodShow();
        expect(products.find()).toEqual(result);
    });

    it('should return null', async () => {
        const mockOrders = [{}];
        products.find = jest.fn().mockReturnValue(mockOrders);
        const result = await prodShow();
        expect(products.find()).toEqual(result);
    });

    it('It should return the updated', async () => {
        const _id = '66b99eba6e91031827f6e3c0';
        const mockProduct: Products = {
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }
        products.findByIdAndUpdate = jest.fn().mockReturnValue({ _id, ...mockProduct });
        const result = await prodUpdate(_id, mockProduct);
        expect(products.findByIdAndUpdate()).toEqual(result);
    });

    it('Should return an error when updating', async () => {
        const _id = '66b99eba6e91031827f6';
        const mockProduct: Products = {
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }
        products.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(_id);
        await expect(prodUpdate(_id, mockProduct)).rejects.toThrow("error updating");
    });


    it('Should return the product deleted', async () => {
        const _id = '66b99eba6e91031827f6';
        const mockProducts = {
            _id,
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }
        products.findByIdAndDelete = jest.fn().mockReturnValue(mockProducts);
        const result = await prodDelete(_id);
        expect(products.findByIdAndDelete()).toEqual(result);
    });

    it('must reject the promise to eliminate', async () => {
        const _id = '66b99eba6e91031827f6';
        products.findByIdAndDelete = jest.fn().mockRejectedValue(_id);
        await expect(prodDelete(_id)).rejects.toThrow("error when deleting");
    });


    it('a single product must return', async () => {

        const mockProduct: Products = {
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }

        products.find = jest.fn().mockReturnValue(mockProduct);
        const results = await prodFilter(mockProduct);
        expect(products.find()).toEqual(results);
    })

    it('filtering error', async () => {

        const mockProduct: Products = {
            productID: 1,
            productName: "Chais",
            supplierID: 1,
            categoryID: 1,
            unit: "10 boxes x 20 bags",
            price: 18
        }

        products.find = jest.fn().mockRejectedValue(mockProduct);
        expect(prodFilter(mockProduct)).rejects.toThrow("impossible to filter");
    })


});

