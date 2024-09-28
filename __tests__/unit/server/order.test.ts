import { Orders } from "../../../src/interfaces/Northwin";

import { orders } from '../../../src/models/models.Northwin';
import { ordCreator, ordDelete, ordShow, ordUpdate } from '../../../src/services/orders.service'
import { ordFilter } from '../../../src/services/filters.service';
jest.mock('../../../src/models/models.Northwin');

describe.skip('orders', () => {

  it('should insert a doc into collection', async () => {
   const mockOrder:Orders = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:new Date("1996-07-04"),
    shipperID:3,
}
    orders.create = jest.fn().mockResolvedValue(mockOrder);
    const result = await ordCreator(mockOrder);
    expect(result).toEqual(mockOrder);
    expect(orders.create).toHaveBeenCalledWith(mockOrder);
  });

  it('should handle errors from orders create', async () => {
   const mockOrder:Orders = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:new Date("1996-07-04"),
    shipperID:3,
}

    orders.create = jest.fn().mockRejectedValue(mockOrder);
    await expect(ordCreator(mockOrder)).rejects.toThrow('Error');
  });

  it('should show all documents', async () => {
   const mockOrder:Orders = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:new Date("1996-07-04"),
    shipperID:3,
}
    orders.find = jest.fn().mockReturnValue(mockOrder);
    const result = await ordShow();
    expect(orders.find()).toEqual(result);
  });

  it('should return null', async () => {
    const mockOrders = [{}];
    orders.find = jest.fn().mockReturnValue(mockOrders);
    const result = await ordShow();
    expect(orders.find()).toEqual(result);
  });

  it('It should return the updated', async () => {
    const _id = '66b99eba6e91031827f6e3c0';
   const mockOrder:Orders = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:new Date("1996-07-04"),
    shipperID:3,
}
    orders.findByIdAndUpdate = jest.fn().mockReturnValue({ _id, ...mockOrder });
    const result = await ordUpdate(_id, mockOrder);
    expect(orders.findByIdAndUpdate()).toEqual(result);
  });

  it('Should return an error when updating', async () => {
    const _id = '66b99eba6e91031827f6';
   const mockOrder:Orders = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:new Date("1996-07-04"),
    shipperID:3,
}
    orders.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(_id);
    await expect(ordUpdate(_id, mockOrder)).rejects.toThrow("error updating");
  });


  it('Should return the order deleted', async () => {
    const _id = '66b99eba6e91031827f6';
    const mockOrder = {
      _id,
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }
    orders.findByIdAndDelete = jest.fn().mockReturnValue(mockOrder);
    const result = await ordDelete(_id);
    expect(orders.findByIdAndDelete()).toEqual(result);
  });

  it('must reject the promise to eliminate', async () => {
    const _id = '66b99eba6e91031827f6';
    orders.findByIdAndDelete = jest.fn().mockRejectedValue(_id);
    await expect(ordDelete(_id)).rejects.toThrow("error when deleting");
  });


  it('a single order must return', async () => {
    
   const mockOrder:Orders = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:new Date("1996-07-04"),
    shipperID:3,
}

    orders.find = jest.fn().mockReturnValue(mockOrder);
    const results = await ordFilter(mockOrder);
    expect(orders.find()).toEqual(results);
  })

  it('filtering error', async () => {

   const mockOrder:Orders = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:new Date("1996-07-04"),
    shipperID:3,
}

    orders.find = jest.fn().mockRejectedValue(mockOrder);
    expect(ordFilter(mockOrder)).rejects.toThrow("impossible to filter");
  })


});



