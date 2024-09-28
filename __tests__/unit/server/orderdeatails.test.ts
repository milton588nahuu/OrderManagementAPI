import { OrderDetails } from "../../../src/interfaces/Northwin";

import { ordDetailsCreator, ordDetailsDelete, ordDetailsShow, ordDetailsUpdate } from '../../../src/services/orderdetails.service'
import { orderDetFilter } from '../../../src/services/filters.service';
import { orderdetails } from "../../../src/models/models.Northwin";
jest.mock('../../../src/models/models.Northwin');

describe.skip('orderdetails', () => {

  it('should insert a doc into collection', async () => {
    const mockOderDetails: OrderDetails = {
      orderDetailID: 1,
      orderID: 10248,
      productID: 11,
      quantity: 12
    }
    orderdetails.create = jest.fn().mockResolvedValue(mockOderDetails);
    const result = await ordDetailsCreator(mockOderDetails);
    expect(result).toEqual(mockOderDetails);
    expect(orderdetails.create).toHaveBeenCalledWith(mockOderDetails);
  });

  it('should handle errors from orderdetails create', async () => {
    const mockOderDetails: OrderDetails = {
      orderDetailID: 1,
      orderID: 10248,
      productID: 11,
      quantity: 12
    }

    orderdetails.create = jest.fn().mockRejectedValue(mockOderDetails);
    await expect(ordDetailsCreator(mockOderDetails)).rejects.toThrow('Error');
  });

  it('should show all documents', async () => {
    const mockOderDetails: OrderDetails = {
      orderDetailID: 1,
      orderID: 10248,
      productID: 11,
      quantity: 12
    }
    orderdetails.find = jest.fn().mockReturnValue(mockOderDetails);
    const result = await ordDetailsShow();
    expect(orderdetails.find()).toEqual(result);
  });

  it('should return null', async () => {
    const mockOrders = [{}];
    orderdetails.find = jest.fn().mockReturnValue(mockOrders);
    const result = await ordDetailsShow();
    expect(orderdetails.find()).toEqual(result);
  });

  it('It should return the updated', async () => {
    const _id = '66b99eba6e91031827f6e3c0';
    const mockOderDetails: OrderDetails = {
      orderDetailID: 1,
      orderID: 10248,
      productID: 11,
      quantity: 12
    }
    orderdetails.findByIdAndUpdate = jest.fn().mockReturnValue({ _id, ...mockOderDetails });
    const result = await ordDetailsUpdate(_id, mockOderDetails);
    expect(orderdetails.findByIdAndUpdate()).toEqual(result);
  });

  it('Should return an error when updating', async () => {
    const _id = '66b99eba6e91031827f6';
    const mockOderDetails: OrderDetails = {
      orderDetailID: 1,
      orderID: 10248,
      productID: 11,
      quantity: 12
    }
    orderdetails.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(_id);
    await expect(ordDetailsUpdate(_id, mockOderDetails)).rejects.toThrow("error updating");
  });


  it('Should return the orderdetails deleted', async () => {
    const _id = '66b99eba6e91031827f6';
    const mockOderDetails = {
      _id,
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }
    orderdetails.findByIdAndDelete = jest.fn().mockReturnValue(mockOderDetails);
    const result = await ordDetailsDelete(_id);
    expect(orderdetails.findByIdAndDelete()).toEqual(result);
  });

  it('must reject the promise to eliminate', async () => {
    const _id = '66b99eba6e91031827f6';
    orderdetails.findByIdAndDelete = jest.fn().mockRejectedValue(_id);
    await expect(ordDetailsDelete(_id)).rejects.toThrow("error when deleting");
  });


  it('a single orderdetails must return', async () => {

    const mockOrderDetails: OrderDetails = {
      orderDetailID: 1,
      orderID: 10248,
      productID: 11,
      quantity: 12
    }

    orderdetails.find = jest.fn().mockReturnValue(mockOrderDetails);
    const results = await orderDetFilter(mockOrderDetails);
    expect(orderdetails.find()).toEqual(results);
  })

  it('filtering error', async () => {

    const mockOderDetails: OrderDetails = {
      orderDetailID: 1,
      orderID: 10248,
      productID: 11,
      quantity: 12
    }

    orderdetails.find = jest.fn().mockRejectedValue(mockOderDetails);
    expect(orderDetFilter(mockOderDetails)).rejects.toThrow("impossible to filter");
  })


});





