
import swaggerJSDoc,{OAS3Definition,OAS3Options} from "swagger-jsdoc";

const swaggerDefinition : OAS3Definition = {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description:"A simple express library Api"
      },
      servers: [
        {
          url:'http://localhost:3000/api/v1'
        }
      ],
      components:{
        securitySchemes:{
          bearerAuth:{
            type:"http",
            scheme:"bearer",
            bearerFormat:"JWT"
          }
        },
        schemas:{  
          AuthenticationError:{
            type:"object",
            properties:{
              message: { type: 'string' }
            },
            example:"Invalid credentials"
          },
          Accepted:{
            type:"object",
            properties:{
              message: { type: 'string' }
            },
            example:"The request has been received but has not yet been processed."
          },
          IntErrorServer:{
            type:"object",
            properties:{
              message: { type: 'string' }
            },
            example:"An internal error occurred on the server while processing the request"
          },
          NotFound:{
            type:"object",
            properties:{
              message: { type: 'string' }
            },
            example:"The resource you are trying to delete does not exist"
          },
          Categories:{
            type:"object",
            properties:{
              categoryID:{
                type:"number"
              },
              category:{
                type:"string"
              },
              description:{
                type:"string"
              }
            },
            required:[
              "categoryID",
              "category",
              "description"
            ]
          },
          Products:{
            type:"object",
            properties:{
              productID:{
                type:"integer"
              },
              productName:{
                type:"string"
              },
              supplierID:{
                type:"integer"
              },
              categoryID:{
                type:"integer"
              },
              unit:{
                type:"string"
              },
              price:{
                type:"integer"
              }
            },
            required:[
              "productID",
              "productName",
              "supplierID",
              "categoryID",
              "unit",
              "price",
            ]
          },

          Suppliers:{
            type:"object",
            properties:{
              supplierID:{
                type:"number"
              },
              supplierName:{
                type:"string"
              },
              contactName:{
                type:"string"
              },
              address:{
                type:"string"
              },
              city:{
                type:"string"
              },
              postalCode:{
                type:"string"
              },
              country:{
                type:"string"
              },
              phone:{
                type:"string"
              },
            },
            required:[
              "supplierID",
              "supplierName",
              "contactName",
              "address",
              "city",
              "postalCode",
              "country",
              "phone",
            ]

          },

          Shippers:{
            type:"object",
            properties:{
              shipperID:{
                type:"number"
              },
              shipperName:{
                type:"string"
              },
              phone:{
                type:"string"
              },
            },
            required:[
              "shipperID",
              "shipperName",
              "phone",
            ]

          },

          Employees:{
            type:"object",
            properties:{
              employeeID:{
                type:"number"
              },
              firstName:{
                type:"string"
              },
              lastName: {
                type:"string"
              },
              birthdate: {
                type:"string"
              },
              photo:{
                type:"string"
              },
              notes:{
                type:"string"
              },
            },
            required:[
              "employeeID",
              "firstName",
              "lastName",
              "birthdate",
              "photo",
              "notes",
            ]

          },

          Orders:{
            type:"object",
            properties:{
              orderID:{
                type:"number"
              },
              customerID:{
                type:"number"
              },
              employeeID: {
                type:"number"
              },
              orderDate: {
                type:"string",
                format:"date"
              },
              shipperID:{
                type:"number"
              },
            },
            required:[
              "orderID",
              "customerID",
              "employeeID",
              "orderDate",
              "city",
              "shipperID",
            ]

          },

          Customers:{
            type:"object",
            properties:{
              customerID:{
                type:"number"
              },
              customerName:{
                type:"string"
              },
              contactName: {
                type:"string"
              },
              city: {
                type:"string"
              },
              address:{
                type:"string"
              },
              postalCode:{
                type:"string"
              },
              country:{
                type:"string"
              },
            },
            required:[
              "customerID",
              "customerName",
              "contactName",
              "address",
              "city",
              "postalCode",
              "country",
            ]

          },

          OrderDetails:{
            type:"object",
            properties:{
              orderDetailID:{
                type:"number"
              },
              orderID:{
                type:"number"
              },
              productID: {
                type:"number"
              },
              quantity:{
                type:"number"
              },
            },
            required:[
              "oorderDetailID",
              "orderID",
              "productID",
              "quantity"
            ]

          },

        }
      },
      tags:[
        {
          name:"categories"
        },
        {
          name:"customers"
        },
        {
          name:"employees"
        },
        {
          name:"orders"
        },
        {
          name:"orderdetails"
        },
        {
          name:"products"
        },
        {
          name:"shippers"
        },
        {
          name:"suppliers"
        },
      ],
      paths:{   
        /**
         * Categories
         */
        "/categ": {
          get:{
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags: ["categories"],
            summary: "show all objects of  categories",
            responses: {
              200:{
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Categories"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          post: {
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags: ["categories"],
            summary: "creates an object of the category ",
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Categories"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Categories"   
                    }
                  }
                }
              },
              202:{
                description:"Los datos ya exThe data already exists",
                content:{
                 "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Accepted"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          }
        },
        "/categ/{id}":{
          put:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["categories"],
            summary: "update a categories  object",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the category",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Categories"
                  }
                }
              }
            },
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Categories"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          get:{
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags:["categories"],
            summary: "show a single object of the category ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the category",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Categories"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          delete:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["categories"],
            summary: "delete an object from  category",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the category",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Categories"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
        },
        /**
         * Customers 
         */
        "/cust/{id}":{
            put:{
              security: [
                {
                  bearerAuth:['white:admins']
                }
              ],
              tags:["customers"],
              summary: "update a customer object",
              parameters: [
                {
                  name:"id",
                  in:"path",
                  description:"ID of the customer",
                  required: true,
                  schema: {
                    type: "string"
                  }
                }
              ],
              requestBody:{
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Customers",
                      type: 'object',
                      properties: {
                        message: { type: 'string' }
                      }
                    }
                  }
                }
              },
              responses:{
                200:{
                  description:"Successful response",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:"#/components/schemas/Customers"
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                         $ref: '#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
            get:{
              security: [
                {
                  bearerAuth:['read:admins']
                }
              ],
              tags:["customers"],
              summary: "show a single object of the customer ",
              parameters: [
                {
                    name: "id",
                    in: "path",
                    description:"ID of the customer",
                    required: true
                }
              ],
              responses: {
                200:{
                  description:"Successful response",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:"#/components/schemas/Customers"
                      }
                    }
                  }
                }, 
                401:{
                    description:"Unauthorized",
                    content:{
                      "application/json":{
                        schema:{
                          $ref:'#/components/schemas/AuthenticationError'
                        }
                      }
                    }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
            delete:{
              security: [
                {
                  bearerAuth:['white:admins']
                }
              ],
              tags:["customers"],
              summary: "delete an object from  Employee",
              parameters: [
                {
                    name:"id",
                    in: "path",
                    description:"ID of the customer",
                    required: true
                }
              ],
              responses: {
                200:{
                  description: "Successful response",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:"#/components/schemas/Customers"
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:'#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
          },
          "/cust":{
            get: {
              security: [
                {
                  bearerAuth:['read:admins']
                }
              ],
              tags: ["customers"],
              summary: "Show all stored customers",
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                          $ref: "#/components/schemas/Customers"   
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
            post:{
              security: [
                {
                  bearerAuth:['write:admins']
                }
              ],
              tags: ["customers"],
              summary: "creates an object of the customer ",
              requestBody:{
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Customers"
                    }
                  }
                }
              },
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                          $ref: "#/components/schemas/Customers"   
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                         $ref: '#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            }
          },
          /**
          * Employees
          */ 
         "/empl": {
          get: {
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags: ["employees"],
            summary: "Show all stored employees",
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Employees"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          post: {
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags: ["employees"],
            summary: "creates an object of  Employee",
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Employees"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Employees"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          }
        },
        "/empl/{id}":{
          put:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["employees"],
            summary: "update a employee type ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the employee",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Employees"
                  }
                }
              }
            },
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Employees"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          get:{
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags:["employees"],
            summary: "shows a single object of the employees ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the Employee",
                  required: true,
                  schema: {
                    type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Employees"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          delete:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["employees"],
            summary: "delete an object of  employee",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the Employee",
                  required: true,
                  schema: {
                      type: "integer",
                      format: "int64"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Employees"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
        },
        /**
          * order
        */
        "/ord": {
          get: {
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags: ["orders"],
            summary: "Show all stored orders",
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Orders"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          post: {
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags: ["orders"],
            summary: "creates an object of  order",
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Orders"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Orders"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          }
        },
        "/ord/{id}":{
          put:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["orders"],
            summary: "update a order type ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the order",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Orders"
                  }
                }
              }
            },
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Orders"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          get:{
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags:["orders"],
            summary: "shows a single object of the orders ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the order",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Orders"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          delete:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["orders"],
            summary: "delete an object of  order",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the order",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Orders"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
        },
        /**
        * orderdetails
        */
        "/ord-det": {
          get: {
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags: ["orderdetails"],
            summary: "Show all stored orderdetails",
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/OrderDetails"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          post: {
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags: ["orderdetails"],
            summary: "creates an object of  orderdetail",
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/OrderDetails"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/OrderDetails"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          }
        },
        "/ord-det/{id}":{
          put:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["orderdetails"],
            summary: "update a orderdetail type ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the orderdetail",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/OrderDetails"
                  }
                }
              }
            },
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/OrderDetails"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          get:{
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags:["orderdetails"],
            summary: "shows a single object of the orderdetail ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the orderdetail",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/OrderDetails"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          delete:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["orderdetails"],
            summary: "delete an object of  orderdetail",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the orderdetail",
                  required: true,
                  schema: {
                      type: "integer",
                      format: "int64"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/OrderDetails"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
        },
        /**
        * productos
        */
        "/prod": {
          get: {
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags: ["products"],
            summary: "Show all stored products",
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Products"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          post: {
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags: ["products"],
            summary: "creates an object of  product",
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Products"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Products"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          }
        },
        "/prod/{id}":{
          put:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["products"],
            summary: "update a product type ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the product",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Products"
                  }
                }
              }
            },
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Products"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          get:{
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags:["products"],
            summary: "shows a single object of the product ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the product",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Products"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          delete:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["products"],
            summary: "delete an object of  product",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the product",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Products"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
        },
        /**
        * shippers
        */
        "/shipp": {
          get: {
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags: ["shippers"],
            summary: "Show all stored shipper",
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Shippers"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          post: {
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags: ["shippers"],
            summary: "creates an object of  shipper",
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Shippers"
                  }
                }
              }
            },
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Shippers"   
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          }
        },
        "/shipp/{id}":{
          put:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["shippers"],
            summary: "update a shipper type ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of shipper",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            requestBody:{
              content:{
                "application/json":{
                  schema:{
                    $ref:"#/components/schemas/Shippers"
                  }
                }
              }
            },
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Shippers"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          get:{
            security: [
              {
                bearerAuth:['read:admins']
              }
            ],
            tags:["shippers"],
            summary: "shows a single object of the shipper ",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the shipper",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Shippers"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
          delete:{
            security: [
              {
                bearerAuth:['write:admins']
              }
            ],
            tags:["shippers"],
            summary: "delete an object of  shipper",
            parameters: [
              {
                  name: "id",
                  in: "path",
                  description:"ID of the shipper",
                  required: true,
                  schema: {
                      type: "string"
                  }
              }
            ],
            responses: {
              200:{
                description: "Successful response",
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Shippers"
                    }
                  }
                }
              },
              401:{
                description:"Unauthorized",
                content:{
                  "application/json":{
                    schema:{
                      $ref:'#/components/schemas/AuthenticationError'
                    }
                  }
                }
              },
              404:{
                description:"not found",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/NotFound'
                    }
                  }
                }
              },
              500:{
                description:"internal error on the server",
                content:{
                  "application/json":{
                    schema:{
                       $ref:'#/components/schemas/IntErrorServer'
                    }
                  }
                }
              }
            }
          },
        },
        /**
        * suppliers
        */
          "/supp": {
            get: {
              security: [
                {
                  bearerAuth:['read:admins']
                }
              ],
              tags: ["suppliers"],
              summary: "Show all stored supplier",
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                          $ref: "#/components/schemas/Suppliers"   
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:'#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
            post: {
              security: [
                {
                  bearerAuth:['write:admins']
                }
              ],
              tags: ["suppliers"],
              summary: "creates an object of  supplier",
              requestBody:{
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Suppliers"
                    }
                  }
                }
              },
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                          $ref: "#/components/schemas/Suppliers"   
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:'#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            }
          },
          "/supp/{id}":{
            put:{
              security: [
                {
                  bearerAuth:['write:admins']
                }
              ],
              tags:["suppliers"],
              summary: "update a supplier type ",
              parameters: [
                {
                    name: "id",
                    in: "path",
                    description:"ID of supplier",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
              ],
              requestBody:{
                content:{
                  "application/json":{
                    schema:{
                      $ref:"#/components/schemas/Suppliers"
                    }
                  }
                }
              },
              responses: {
                200:{
                  description: "Successful response",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:"#/components/schemas/Suppliers"
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:'#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
            get:{
              security: [
                {
                  bearerAuth:['read:admins']
                }
              ],
              tags:["suppliers"],
              summary: "shows a single object of the supplier ",
              parameters: [
                {
                    name: "id",
                    in: "path",
                    description:"ID of the supplier",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
              ],
              responses: {
                200:{
                  description: "Successful response",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:"#/components/schemas/Suppliers"
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:'#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
            delete:{
              security: [
                {
                  bearerAuth:['write:admins']
                }
              ],
              tags:["suppliers"],
              summary: "delete an object of  supplier",
              parameters: [
                {
                    name: "id",
                    in: "path",
                    description:"ID of the supplier",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
              ],
              responses: {
                200:{
                  description: "Successful response",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:"#/components/schemas/Suppliers"
                      }
                    }
                  }
                },
                401:{
                  description:"Unauthorized",
                  content:{
                    "application/json":{
                      schema:{
                        $ref:'#/components/schemas/AuthenticationError'
                      }
                    }
                  }
                },
                404:{
                  description:"not found",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/NotFound'
                      }
                    }
                  }
                },
                500:{
                  description:"internal error on the server",
                  content:{
                    "application/json":{
                      schema:{
                         $ref:'#/components/schemas/IntErrorServer'
                      }
                    }
                  }
                }
              }
            },
            
          },
         
      }
}


const options:OAS3Options = {
    swaggerDefinition,
    securityDefinitions:{
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },  
    },
    apis: ['./src/routes/mian.routes.ts']  
};



const swaggerSpecs = swaggerJSDoc(options);

export {swaggerSpecs};

