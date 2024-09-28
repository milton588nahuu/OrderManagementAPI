import {Categories, Customers, Employees, OrderDetails, Orders, Products, Shippers, Suppliers} from '../interfaces/Northwin'
import {categFilter, custFilter, empFilter, orderDetFilter, ordFilter, prodFilter, shippFilter, suppFilter} from '../services/filters.service'
interface isExist {
  value:boolean,
  field:string
}
/**
 * Estas funcines toman como argumentos los datos especificados en la Interface Northwin y verifican si existen en sus correspondientes colecciones  
 */

/**
 * @param customers 
 * @returns {true | false}
 */
async function isExistCustomerts(customers:Customers):Promise<isExist>{
    let valueExits:isExist = { value:false,field:""};
    const foundCust = await custFilter(customers);
    if(foundCust != null){
        if(foundCust.filter((cust,key) => cust.address == customers.address).length > 0){
          valueExits.value = true;
          valueExits.field = `${customers.address}` 
        } else if (foundCust.filter((cust,key) => cust.contactName == customers.contactName).length > 0){
          valueExits.value = true;
          valueExits.field = `${customers.contactName}`
        } else if(foundCust.filter((cust,key) => cust.customerName == customers.customerName).length > 0){
          valueExits.value = true;
          valueExits.field = `${customers.customerName}`
        } else if(foundCust.filter((cust,key) => cust.customerID == customers.customerID).length > 0) {
          valueExits.value = true;
          valueExits.field = `${customers.customerID}`
        }
    }
    return valueExits;
}
/**
 * @param categories 
 * @returns  {true | false}
 */
async function isExistCateg(categories:Categories):Promise<isExist>{
  let valueExits:isExist = { value:false,field:""};
  const foundCateg = await categFilter(categories);
  if(foundCateg != null){
      if(foundCateg.filter((categ,key) => categ.category == categories.category).length > 0){
        valueExits.value = true;
        valueExits.field = `${categories.category}`;
      } else if (foundCateg.filter((categ,key) => categ.categoryID == categories.categoryID).length > 0){
        valueExits.value = true;
        valueExits.field = `${categories.categoryID}`;
      }
  }
  return valueExits;
}
/**
 * @param product 
 * @returns  {true | false}
 */
async function isExistProduct(product:Products):Promise<isExist>{
  let valueExits:isExist = { value:false,field:""};
  const foundProd = await prodFilter(product);
  if(foundProd != null){
      if(foundProd.filter((prod,key) => prod.productID == product.productID).length > 0){
        valueExits.value = true;
        valueExits.field = `${product.productID}`; 
      } else if (foundProd.filter((prod,key) => prod.unit == product.unit).length > 0){
        valueExits.value = true;
        valueExits.field = `${product.unit}`;
      } else if (foundProd.filter((prod,key) => prod.productName == product.productName).length > 0){
        valueExits.value = true;
        valueExits.field = `${product.productName}`;
      } 
  }
  return valueExits;
}
/**
 * @param order 
 * @returns  {true | false}
 */
async function isExistOrd(order:Orders):Promise<isExist>{
  let valueExits:isExist = { value:false,field:""};
  const foundOrd = await ordFilter(order);
  if(foundOrd != null){
      if(foundOrd.filter((ord,key) => ord.orderID == order.orderID).length > 0){
        valueExits.value = true;
        valueExits.field = `${order.orderDate}`; 
      } else if (foundOrd.filter((ord,key) => ord.orderDate == ord.orderDate).length > 0){
        valueExits.value = true;
        valueExits.field = `${order.orderID}`;
      } 
  }
  return valueExits;
}
/**
 * @param orderDet 
 * @returns  {true | false}
 */
async function isExistOrdDet(orderDet:OrderDetails):Promise<isExist>{
  let valueExits:isExist = { value:false,field:""};
  const foundOrdDet = await orderDetFilter(orderDet);
  if(foundOrdDet != null){
      if(foundOrdDet.filter((ordDet,key) => ordDet.orderDetailID == orderDet.orderDetailID).length > 0){
        valueExits.value = true;
        valueExits.field = `${orderDet.orderDetailID}`;
      } else if (foundOrdDet.filter((ordDet,key) => ordDet.quantity == orderDet.quantity).length > 0){
        valueExits.value = true;
        valueExits.field = `${orderDet.quantity}`;
      } 
  }
  return valueExits;
}
/**
 * @param supplers 
 * @returns  {true | false}
 */
async function isExistSupp(supplers:Suppliers):Promise<isExist>{
  let valueExits:isExist = { value:false,field:""};
  const foundSupp = await suppFilter(supplers);
  if(foundSupp != null){
      if (foundSupp.filter((supp,key) => supp.supplierID == supplers.supplierID).length > 0){
        valueExits.value = true;
        valueExits.field = `${supplers.supplierID}`
      } else if(foundSupp.filter((supp,key) => supp.supplierName == supplers.supplierName).length > 0){
        valueExits.value = true;
        valueExits.field = `${supplers.supplierName}`
      } 
  }
  return valueExits;
}
/**
 * @param shipper 
 * @returns  {true | false}
 */
async function isExistShipp(shipper:Shippers):Promise<isExist>{
  let valueExits:isExist = { value:false,field:""};
  const foundShipp = await shippFilter(shipper);
  if(foundShipp != null){
      if(foundShipp.filter((shipp,key) => shipp.shipperID == shipper.shipperID).length > 0){
        valueExits.value = true;
        valueExits.field = `${shipper.shipperID}` 
      } else if (foundShipp.filter((shipp,key) => shipp.shipperName == shipper.shipperName).length > 0){
        valueExits.value = true;
        valueExits.field = `${shipper.shipperName}`
      } 
  }
  return valueExits;
}
/**
 * @param employee 
 * @returns  {true | false}
 */
async function isExistEmpl(employee:Employees):Promise<isExist>{
  let valueExits:isExist = { value:false,field:""};
  const found = await empFilter(employee);
  if(found != null){
      if(found.filter((empl,key) => empl.employeeID == employee.employeeID).length > 0){
        valueExits.value = true;
        valueExits.field = `${employee.employeeID}` 
      } else if (found.filter((empl,key) => empl.lastName == employee.lastName).length > 0){
        valueExits.value = true;
        valueExits.field = `${employee.lastName}`
      } else if(found.filter((empl,key) => empl.firstName == employee.firstName).length > 0){
        valueExits.value = true;
        valueExits.field = `${employee.firstName}`
      } else if(found.filter((empl,key) => empl.birthdate == employee.birthdate).length > 0) {
        valueExits.value = true;
        valueExits.field = `${employee.birthdate}`
      }
  }
  return valueExits;
}



export { 
  isExistCustomerts,
  isExistCateg,
  isExistEmpl,
  isExistOrd,
  isExistOrdDet,
  isExistProduct,
  isExistShipp,
  isExistSupp 
};
