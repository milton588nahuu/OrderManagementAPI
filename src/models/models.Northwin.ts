import mongoose from 'mongoose';
import Employee from '../schemas/Schemas.Employees';
import Customer from '../schemas/Schemas.Customers';
import Supplier from '../schemas/Shemas.Suppliers';
import Shipper from '../schemas/Shemas.Shippers';
import Category from '../schemas/Schemas.Categories';
import Product from '../schemas/Schemas.Products';
import Order from '../schemas/Shemas.Orders';
import OrderDetails from '../schemas/Schemas.OrderDetails';
/**
 *  Northwin models
 */
const categories = mongoose.model('categories',Category);
const customers = mongoose.model('customers',Customer);
const employees = mongoose.model('employees',Employee)
const shippers = mongoose.model('shippers',Shipper);
const suppliers = mongoose.model('suppliers',Supplier);

const products = mongoose.model('products',Product);
const orderdetails = mongoose.model('corderdetails',OrderDetails);
const orders = mongoose.model('orders',Order);

export { 
    categories,
    customers,
    employees,
    shippers,
    suppliers,
    products,
    orders,
    orderdetails
};