import { isDate } from "util/types";
import { Categories, Customers, Employees, OrderDetails, Orders, Products, Shippers, Suppliers } from "../interfaces/Northwin"

import { categories, customers, employees, orderdetails, orders, products, shippers, suppliers } from '../models/models.Northwin'

export async function categFilter(category: Categories): Promise<Categories[] | null> {
    try {
        const id = category.categoryID;
        const regexcateg = new RegExp(`^${category.category}`, "i");
        const result = await categories.find({
            categoryID:{ $eq: id },
            category:{ $regex: regexcateg}
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }
}

export async function custFilter(customer: Customers): Promise<Customers[] | null> {
    try {
        const id = customer.customerID;
        const regexContacName = new RegExp(`^${customer.contactName}`, "i");
        const regexCustName = new RegExp(`^${customer.customerName}`, "i");
        const regexCustCountry = new RegExp(`^${customer.country}`, "i");
        const result = await customers.find({
            customerID: { $eq: id },
            customerName: { $regex: regexCustName },
            contactName: { $regex: regexContacName },
            country: { $regex: regexCustCountry }
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }
}

export async function prodFilter(product: Products): Promise<Products[] | null> {
    try {
        const id = product.productID;
        const regexProdName = new RegExp(`^${product.productName}`, "i");
        const regexProdUnit = new RegExp(`^${product.unit}`, "i");
        const result = await products.find({
            productID: { $eq: id },
            productName: { $regex: regexProdName },
            unit: { $regex: regexProdUnit }
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }
}

export async function empFilter(employee: Employees): Promise<Employees[] | null> {
    try {
        const id = employee.employeeID;
        const regexFirstName = new RegExp(`^${employee.firstName}`, "i");
        const regexLastName = new RegExp(`^${employee.lastName}`, "i");
        const regexBirthDate = new RegExp(`^${employee.birthdate}`, "i");
        const result = await employees.find({
            employeeID: { $eq: id },
            firstName: { $regex: regexFirstName },
            lastName: { $regex: regexLastName },
            birthdate: { $regex: regexBirthDate }
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }
}

export async function ordFilter(order: Orders): Promise<Orders[] | null> {
    try {
        const id = order.orderID;
        const result = await orders.find({
            orderID: { $eq: id },
            orderDate: { $eq: order.orderDate }
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }
}

export async function orderDetFilter(orderDet: OrderDetails): Promise<OrderDetails[] | null> {
    try {
        const id = orderDet.orderDetailID;
        const quantityOrder = orderDet.quantity
        const result = await orderdetails.find({
            orderDetailID: { $eq: id },
            quantity: { $eq: quantityOrder }
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }
}

export async function suppFilter(supplier: Suppliers): Promise<Suppliers[] | null> {
    try {
        const id = supplier.supplierID;
        const regexSupplierName = new RegExp(`^${supplier.supplierName}`, "i");
        const result = await suppliers.find({
            supplierID: { $eq: id },
            supplierName: { $regex: regexSupplierName }
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }
}

export async function shippFilter(shipper: Shippers): Promise<Shippers[] | null> {
    try {
        const id = shipper.shipperID
        const regexShipperName = new RegExp(`^${shipper.shipperName}`, "i");
        const result = await shippers.find({
            shipperID: { $eq: id },
            shipperName: { $regex: regexShipperName }
        });
        return result;
    } catch (error) {
        throw new Error("impossible to filter");
    }

}