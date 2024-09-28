interface Categories {
  categoryID:number;
  category:string;
  description:string;
}
interface Customers {
  customerID:number;
  customerName:string;
  contactName:string;
  address:string;
  city:string;
  postalCode:string;
  country:string;
}
interface Employees {
  employeeID: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  photo: string;
  notes: string;
}
interface OrderDetails {
  orderDetailID:number;
  orderID:number;
  productID:number;
  quantity:number
}
interface Orders {
  orderID:number;
  customerID:number;
  employeeID:number;
  orderDate:Date;
  shipperID:number;
}
interface Products {
  productID:number;
  productName:string;
  supplierID:number;
  categoryID:number;
  unit:string;
  price:number;
}
interface Shippers {
  shipperID:number;
  shipperName:string;
  phone:string;
}
interface Suppliers {
  supplierID:number;
  supplierName:string;
  contactName:string;
  address:string;
  city:string;
  postalCode:string;
  country:string;
  phone:string;
}

export {
  Categories,
  Customers,
  Employees,
  OrderDetails,
  Orders,
  Products,
  Shippers,
  Suppliers
}