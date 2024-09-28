import { Shippers } from '../../../src/interfaces/Northwin';
import { shippers } from '../../../src/models/models.Northwin';
import {
    shippCreator, shippShow, shippUpdate, shippDelete
} from '../../../src/services/shippers.service'
import { shippFilter } from '../../../src/services/filters.service';
jest.mock('../../../src/models/models.Northwin');

describe.skip('shippers', () => {

    it('should insert a doc into collection', async () => {
        const mockShippers: Shippers = {
            shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831"
        }
        shippers.create = jest.fn().mockResolvedValue(mockShippers);
        const result = await shippCreator(mockShippers);
        expect(result).toEqual(mockShippers);
        expect(shippers.create).toHaveBeenCalledWith(mockShippers);
    });

    it('should handle errors from suppliers create', async () => {
        const mockShippers: Shippers = {
            shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831"
        }

        shippers.create = jest.fn().mockRejectedValue(mockShippers);
        await expect(shippCreator(mockShippers)).rejects.toThrow('Error');
    });

    it('should show all documents', async () => {
        const moskShippers = [{ shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831" }];
        shippers.find = jest.fn().mockReturnValue(moskShippers);
        const result = await shippShow();
        expect(shippers.find()).toEqual(result);
    });

    it('should return null', async () => {
        const mockShippers = [{}];
        shippers.find = jest.fn().mockReturnValue(mockShippers);
        const result = await shippShow();
        expect(shippers.find()).toEqual(result);
    });

    it('It should return the updated', async () => {
        const _id = '66b99eba6e91031827f6e3c0';
        const mockShippers = {
            shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831"
        };
        shippers.findByIdAndUpdate = jest.fn().mockReturnValue({ _id, ...mockShippers });
        const result = await shippUpdate(_id, mockShippers);
        expect(shippers.findByIdAndUpdate()).toEqual(result);
    });

    it('Should return an error when updating', async () => {
        const _id = '66b99eba6e91031827f6';
        const mockShippers = {
            shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831"
        };
        shippers.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(_id);
        await expect(shippUpdate(_id, mockShippers)).rejects.toThrow("error");
    });


    it('Should return the supplier deleted', async () => {
        const _id = '66b99eba6e91031827f6';
        const mockShippers = {
            _id,
            shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831"
        }
        shippers.findByIdAndDelete = jest.fn().mockReturnValue(mockShippers);
        const result = await shippDelete(_id);
        expect(shippers.findByIdAndDelete()).toEqual(result);
    });

    it('must reject the promise to eliminate', async () => {
        const _id = '66b99eba6e91031827f6';
        shippers.findByIdAndDelete = jest.fn().mockRejectedValue(_id); 
        await expect(shippDelete(_id)).rejects.toThrow("error when deleting");
    });


    it('a single shippier must return',async () => {
        const _id = '66b99eba6e91031827f6';
        const mockShippers = {
            _id,
            shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831"
        }
        shippers.find = jest.fn().mockReturnValue(mockShippers);
        const results = await shippFilter(mockShippers);
        expect(shippers.find()).toEqual(results);
    })

    it('filtering error',async () => {
        const mockShippers = {
            shipperID: 1,
            shipperName: "Speedy Express",
            phone: "(503) 555-9831"
        }
        shippers.find = jest.fn().mockRejectedValue(mockShippers);
        expect(shippFilter(mockShippers)).rejects.toThrow("impossible to filter");
    })


});
