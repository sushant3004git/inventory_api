Inventory Management API Documentation
Welcome to the Inventory Management API documentation. This document provides detailed information on all available endpoints.

Base URL: /api

Product Management (CRUD)
These endpoints handle the core Create, Read, Update, and Delete operations for products.

1. Create a Product
Creates a new product in the inventory.

Endpoint: POST /products

Request Body (JSON):

{
  "name": "Wireless Keyboard",
  "description": "A sleek mechanical wireless keyboard.",
  "stock_quantity": 75,
  "low_stock_threshold": 15
}

name and stock_quantity are required.

Success Response (201 Created):

{
  "_id": "67f5a9b8c7d6e5f4a3b2c1d0",
  "name": "Wireless Keyboard",
  "description": "A sleek mechanical wireless keyboard.",
  "stock_quantity": 75,
  "low_stock_threshold": 15,
  "createdAt": "2025-10-26T12:00:00.000Z",
  "updatedAt": "2025-10-26T12:00:00.000Z"
}

Error Response (400 Bad Request):

{
  "message": "Product name and stock_quantity are required"
}

2. Get All Products
Retrieves a list of all products in the inventory.

Endpoint: GET /products

Success Response (200 OK): An array of product objects.

3. Get a Single Product by ID
Retrieves a single product by its unique MongoDB _id.

Endpoint: GET /products/:id

Success Response (200 OK): A single product object.

Error Response (404 Not Found):

{
  "message": "Product not found"
}

4. Update a Product
Updates a product's details. You only need to provide the fields you wish to change.

Endpoint: PUT /products/:id

Request Body (JSON):

{
  "description": "An updated description for the keyboard.",
  "low_stock_threshold": 10
}

Success Response (200 OK): The fully updated product object.

5. Delete a Product
Permanently deletes a product from the inventory.

Endpoint: DELETE /products/:id

Success Response (200 OK):

{
  "message": "Product deleted successfully"
}

Inventory Management
These endpoints handle stock-specific operations.

1. Increase Stock
Increases the stock_quantity of a product by a specified amount.

Endpoint: POST /products/:id/increase

Request Body (JSON):

{
  "amount": 25
}

Success Response (200 OK): The updated product object with the new stock_quantity.

Error Response (400 Bad Request):

{
  "message": "Invalid amount: must be a positive number"
}

2. Decrease Stock
Decreases the stock_quantity of a product by a specified amount.

Endpoint: POST /products/:id/decrease

Request Body (JSON):

{
  "amount": 10
}

Success Response (200 OK): The updated product object with the new stock_quantity.

Error Response (400 Bad Request): Sent if the amount is greater than the available stock.

{
  "message": "Insufficient stock"
}

3. Get Low Stock Products
Retrieves an array of all products where the stock_quantity is less than the low_stock_threshold.

Endpoint: GET /products/low-stock

Success Response (200 OK): An array of product objects that are low on stock. If no products are low on stock, an empty array [] is returned.