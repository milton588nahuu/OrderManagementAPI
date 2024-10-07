const config = {
    IP: '127.0.0.1',
    Port: '27017',
    Database: 'northwin'
}
//To perform the test you must change the value of the token variable
let auth0:string = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlByZzBaeVpWd25nVE42aXVBaWNuOCJ9.eyJpc3MiOiJodHRwczovL2Rldi02a2hlYWZzemxuaDNtZWFuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuN05UNjdod3plZ1RLNDVGWTMyMTVGSElTS3dHSFl6N0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hcGktbm9ydGh3aW4iLCJpYXQiOjE3Mjc1NDc5NDUsImV4cCI6MTcyNzYzNDM0NSwic2NvcGUiOiJyZWFkOmFkbWlucyB3cml0ZTphZG1pbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJuN05UNjdod3plZ1RLNDVGWTMyMTVGSElTS3dHSFl6NyJ9.eTRviCa378FNANpksfSjIQkwlDUTHTdpqKGcB1f6kHQx0qbjmDPnbvyzkg5BSQ1XvnuRnFWAaiaYsqkynDAryJ_kOFjElUanhB7FRYgOvBKHtFys2x2R3UyZvQkaYAyWVCwyYHz3Gqi3tzwTeteihyteC_QaUvz2pqvJcNSdrtr9MVX4Y0nKYZ3fM-8IL5nSrcfGlFHIceLVuy_lfqYLheloXuydxXTgcNhXEJy7K_dgp6f6Qc5sMKK3tlNWzJdjhs3oebssmBokEJ7hNIX3mcliIkKompfHM67unMB7Ed2WbcVOs_8ik13PIrBRjS7FSImeY6Ll-E6fsifWxO_42g`;
const category = {
    categoryID: 100,
    category: 'Try category',
    description: 'Try description'
};

const customer = {
    address: "Obere Str. 57",
    city: "Berlin",
    contactName: "Maria Anders",
    country: "Germany",
    customerID: 1,
    customerName: "Alfreds Futterkiste",
    postalCode: "12209"
}

const employee = {
    birthdate: "1968-12-08",
    employeeID: 1,
    firstName: "Nancy",
    lastName: "Davolio",
    notes: "Education includes a BA",
    photo: "EmpID1.pic"
}

const orderdetail = {
    orderDetailID: 1,
    orderID: 10248,
    productID: 11,
    quantity: 12
}


const order = {
    orderID:10248,
    customerID:90,
    employeeID:5,
    orderDate:"1996-07-04",
    shipperID:3,
};


const product = {
    categoryID: 2,
    price: 21.35,
    productID: 5,
    productName: "Chef Anton's Gumbo Mix",
    supplierID: 2,
    unit: "36 boxes"
}

const shipper = {
    phone: "(503) 555-9831",
    shipperID: 1,
    shipperName: "Speedy Express"
}

const supplier = {
    address: "49 Gilbert St.",
    city: "Londona",
    contactName: "Charlotte Cooper",
    country: "UK",
    phone: "(171) 555-2222",
    postalCode: "EC1 4SD",
    supplierID: 1,
    supplierName: "Exotic Liquid"
}

const cURL ={
    url:"https://dev-6kheafszlnh3mean.us.auth0.com",
    path:"/oauth/token",
    header:["Content-type","application/json"],
    body:JSON.parse('{"client_id":"n7NT67hwzegTK45FY3215FHISKwGHYz7","client_secret":"sZlilc-bQFuR0TMOEydUZ-Ge4ffYIU5xqbQNYcXvLjDl8qH2f7TGMIQgbOqnHzCj","audience":"https://api-northwin","grant_type":"client_credentials"}')
}

interface authToken {
    access_token: string,
    scope: string,
    expires_in: number,
    token_type: string,
}

export { authToken,config, auth0, category, customer, employee, order, orderdetail, product ,shipper ,supplier,cURL};