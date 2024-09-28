import { Customers } from "../../../src/interfaces/Northwin"

import { customers } from '../../../src/models/models.Northwin';
import { custCreator, custDelete, custShow, custUpdate } from '../../../src/services/customers.service'
import { custFilter } from '../../../src/services/filters.service';
jest.mock('../../../src/models/models.Northwin');

describe.skip('customers', () => {

  it('should insert a doc into collection', async () => {
    const mockCustomer:Customers = {
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }
    customers.create = jest.fn().mockResolvedValue(mockCustomer);
    const result = await custCreator(mockCustomer);
    expect(result).toEqual(mockCustomer);
    expect(customers.create).toHaveBeenCalledWith(mockCustomer);
  });

  it('should handle errors from customers create', async () => {
    const mockCustomer:Customers = {
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }

    customers.create = jest.fn().mockRejectedValue(mockCustomer);
    await expect(custCreator(mockCustomer)).rejects.toThrow('Error');
  });

  it('should show all documents', async () => {
    const mockCustomer:Customers = {
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }
    customers.find = jest.fn().mockReturnValue(mockCustomer);
    const result = await custShow();
    expect(customers.find()).toEqual(result);
  });

  it('should return null', async () => {
    const mockCustomers = [{}];
    customers.find = jest.fn().mockReturnValue(mockCustomers);
    const result = await custShow();
    expect(customers.find()).toEqual(result);
  });

  it('It should return the updated', async () => {
    const _id = '66b99eba6e91031827f6e3c0';
    const mockCustomer:Customers = {
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }
    customers.findByIdAndUpdate = jest.fn().mockReturnValue({ _id, ...mockCustomer });
    const result = await custUpdate(_id, mockCustomer);
    expect(customers.findByIdAndUpdate()).toEqual(result);
  });

  it('Should return an error when updating', async () => {
    const _id = '66b99eba6e91031827f6';
    const mockCustomer:Customers = {
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }
    customers.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(_id);
    await expect(custUpdate(_id, mockCustomer)).rejects.toThrow("error updating");
  });


  it('Should return the customer deleted', async () => {
    const _id = '66b99eba6e91031827f6';
    const mockCustomer = {
        _id,
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }
    customers.findByIdAndDelete = jest.fn().mockReturnValue(mockCustomer);
    const result = await custDelete(_id);
    expect(customers.findByIdAndDelete()).toEqual(result);
  });

  it('must reject the promise to eliminate', async () => {
    const _id = '66b99eba6e91031827f6';
    customers.findByIdAndDelete = jest.fn().mockRejectedValue(_id);
    await expect(custDelete(_id)).rejects.toThrow("error when deleting");
  });


  it('a single customer must return', async () => {
    
    const mockCustomer:Customers = {
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }

    customers.find = jest.fn().mockReturnValue(mockCustomer);
    const results = await custFilter(mockCustomer);
    expect(customers.find()).toEqual(results);
  })

  it('filtering error', async () => {

    const mockCustomer:Customers = {
        customerID: 8,
        customerName:'Bólido Comidas preparadas',
        contactName:'Martín Sommer',
        address:'C/ Araquil, 67',
        city:'Madrid',
        postalCode:'28023',
        country:'Spain'
    }

    customers.find = jest.fn().mockRejectedValue(mockCustomer);
    expect(custFilter(mockCustomer)).rejects.toThrow("impossible to filter");
  })


});



