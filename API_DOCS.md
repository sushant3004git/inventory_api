# Inventory Management API Documentation

Welcome to the Inventory Management API documentation. This document provides detailed information on all available endpoints.

**Base URL:** `/api`

---

## 📦 Product Management (CRUD)

These endpoints handle the core **Create, Read, Update, and Delete** operations for products.

---

### 1. Create a Product

**Endpoint:** `POST /products`  

Creates a new product in the inventory.

**Request Body (JSON):**
```json
{
  "name": "Wireless Keyboard",
  "description": "A sleek mechanical wireless keyboard.",
  "stock_quantity": 75,
  "low_stock_threshold": 15
}
```

> **Required fields:** `name`, `stock_quantity`

**Success Response (201 Created):**
```json
{
  "_id": "67f5a9b8c7d6e5f4a3b2c1d0",
  "name": "Wireless Keyboard",
  "description": "A sleek mechanical wireless keyboard.",
  "stock_quantity": 75,
  "low_stock_threshold": 15,
  "createdAt": "2025-10-26T12:00:00.000Z",
  "updatedAt": "2025-10-26T12:00:00.000Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Product name and stock_quantity are required"
}
```

---

### 2. Get All Products

**Endpoint:** `GET /products`  

Retrieves a list of all products.  

**Success Response (200 OK):**
- Returns an **array of product objects**

---

### 3. Get a Single Product by ID

**Endpoint:** `GET /products/:id`  

Retrieves a product by its unique MongoDB `_id`.

**Success Response (200 OK):**
- Returns a **single product object**

**Error Response (404 Not Found):**
```json
{
  "message": "Product not found"
}
```

---

### 4. Update a Product

**Endpoint:** `PUT /products/:id`  

Updates product details. Only provide the fields you want to change.

**Request Body (JSON):**
```json
{
  "description": "An updated description for the keyboard.",
  "low_stock_threshold": 10
}
```

**Success Response (200 OK):**
- Returns the **fully updated product object**

---

### 5. Delete a Product

**Endpoint:** `DELETE /products/:id`  

Deletes a product permanently.

**Success Response (200 OK):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 📊 Inventory Management

Endpoints for stock-specific operations.

---

### 1. Increase Stock

**Endpoint:** `POST /products/:id/increase`  

Increases a product’s stock by the given amount.

**Request Body (JSON):**
```json
{
  "amount": 25
}
```

**Success Response (200 OK):**
- Returns the updated product with new `stock_quantity`.

**Error Response (400 Bad Request):**
```json
{
  "message": "Invalid amount: must be a positive number"
}
```

---

### 2. Decrease Stock

**Endpoint:** `POST /products/:id/decrease`  

Decreases a product’s stock by the given amount.

**Request Body (JSON):**
```json
{
  "amount": 10
}
```

**Success Response (200 OK):**
- Returns the updated product with new `stock_quantity`.

**Error Response (400 Bad Request):**
```json
{
  "message": "Insufficient stock"
}
```

---

### 3. Get Low Stock Products

**Endpoint:** `GET /products/low-stock`  

Retrieves all products where `stock_quantity < low_stock_threshold`.

**Success Response (200 OK):**
- Returns an array of low-stock products.  
- If none are low on stock: `[]`
