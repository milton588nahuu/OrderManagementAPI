import {
  categFilter,
  custFilter,
  empFilter,
  ordFilter,
  prodFilter,
  orderDetFilter,
  shippFilter,
  suppFilter
} from '../../../src/services/filters.service';
import {
  categories,
  customers,
  employees,
  orders,
  products,
  orderdetails,
  shippers,
  suppliers
} from '../../../src/models/models.Northwin';
import {
  category,
  employee,
  customer,
  order,
  product,
  orderdetail,
  shipper,
  supplier
} from '../../../src/config/mongoConfig'
import { Orders } from '../../../src/interfaces/Northwin';


jest.mock('../../../src/models/models.Northwin',
  () => ({
    categories:{
      find:jest.fn()
     },
    employees:{
      find:jest.fn()
    },
    products:{
      find:jest.fn()
    },
    customers:{
      find:jest.fn()
    },
    orders:{
      find:jest.fn()
    },
    orderdetails:{
      find:jest.fn()
    },
    shippers:{
      find:jest.fn()
    },
    suppliers:{
      find:jest.fn()
    }
  })
);

describe('filters >>> ', () => {

  test('You should receive the category searched.', async () => {
    categories.find = jest.fn().mockResolvedValue(category);
    const result = await categFilter(category);
    expect(categories.find()).resolves.toBe(result);
  });

  test('the wanted employee should receive', async () => {
    employees.find = jest.fn().mockResolvedValue(employee);
    const result = await empFilter(employee);
    expect(employees.find()).resolves.toBe(result);
  });

  test('should receive the desired client', async () => {
    customers.find = jest.fn().mockResolvedValue(customer);
    const result = await custFilter(customer);
    expect(customers.find()).resolves.toBe(result);
  });

  test('you should receive the product you are looking for', async () => {
    products.find = jest.fn().mockResolvedValue(product);
    const result = await prodFilter(product);
    expect(products.find()).resolves.toBe(result);
  });

  test("You should receive the requested order", async () => {
    orders.find = jest.fn().mockResolvedValue(order);
    let ord:Orders = {
      customerID:order.customerID,
      employeeID:order.employeeID,
      orderDate:new Date(order.orderDate),
      orderID:order.orderID,
      shipperID:order.shipperID
    };
    const result = await ordFilter(ord);
    expect(orders.find()).resolves.toBe(result);
  });

  test("You should receive the details of the requested order", async () => {
    orderdetails.find = jest.fn().mockResolvedValue(orderdetail);
    const result = await orderDetFilter(orderdetail);
    expect(orderdetails.find()).resolves.toBe(result);
  });

  test("You should receive the desired carriers", async () => {
    shippers.find = jest.fn().mockResolvedValue(shipper);
    const result = await shippFilter(shipper);
    expect(shippers.find()).resolves.toBe(result);
  });

  test("should receive the sought suppliers", async () => {
    suppliers.find = jest.fn().mockResolvedValue(supplier);
    const result = await suppFilter(supplier);
    expect(suppliers.find()).resolves.toBe(result);
  });


  
  test('You should receive the rejection of the category search', async () => {
    const expected = "impossible to filter";
    categories.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(categFilter(category)).rejects.toThrow(expected);

  });

  test("You should receive the rejection of the client's search", async () => {
    const expected = "impossible to filter";
    customers.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(custFilter(customer)).rejects.toThrow(expected);
  });

  test('You should receive a rejection from your product search', async () => {
    const expected = "impossible to filter";
    products.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(prodFilter(product)).rejects.toThrow(expected);
  });

  test("You should receive the rejection of the transporters' search", async () => {
    const expected = "impossible to filter";
    shippers.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(shippFilter(shipper)).rejects.toThrow(expected);
  });

  test('You should receive rejection from your supplier search', async () => {
    const expected = "impossible to filter";
    suppliers.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(suppFilter(supplier)).rejects.toThrow(expected);
  });

  test('You should receive the rejection of the order search', async () => {
    const expected = "impossible to filter";
    let ord:Orders = {
      customerID:order.customerID,
      employeeID:order.employeeID,
      orderDate:new Date(order.orderDate),
      orderID:order.orderID,
      shipperID:order.shipperID
    };
    orders.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(ordFilter(ord)).rejects.toThrow(expected);
  });

  test('You should receive a rejection of your search for order details', async () => {
    const expected = "impossible to filter";
    orderdetails.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(orderDetFilter(orderdetail)).rejects.toThrow(expected);
  });

  test('should receive rejection of the employee search', async () => {
    const expected = "impossible to filter";
    employees.find = jest.fn().mockRejectedValue(new Error(expected));
    await expect(empFilter(employee)).rejects.toThrow(expected);
  });

});