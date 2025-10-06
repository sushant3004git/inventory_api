# Inventory Management API

A robust backend API built for an internship challenge to track products in a warehouse. The application is built with Node.js, Express, and MongoDB, following RESTful principles and includes a full suite of unit tests.

---

## ✨ Key Features

- ✅ **Full CRUD Functionality**: Create, Read, Update, and Delete products.  
- ✅ **Robust Inventory Logic**: Atomically increase and decrease stock quantities.  
- ✅ **Smart Error Handling**: Prevents stock from going below zero and returns clear error messages for invalid operations (400, 404).  
- ✅ **Low-Stock Reporting**: A dedicated endpoint to find all products that have fallen below their specified `low_stock_threshold`.  
- ✅ **Unit Tested**: Business-critical logic for inventory management is validated with unit tests using Jest and Supertest.  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose ODM  
- **Testing**: Jest, Supertest, MongoDB-Memory-Server  
- **Environment Management**: Dotenv  

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- Node.js (**v18.x or newer recommended**)  
- A running MongoDB instance (e.g., local or MongoDB Atlas)  

### Installation & Setup

**Clone the repository:**
```bash
git clone https://github.com/sushant3004git/inventory_api.git
cd inventory_api
```

**Install project dependencies:**
```bash
npm install
```

**Set up environment variables:**  
Create a `.env` file in the root of the project and add your database connection string.

```env
# .env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

**Run the development server:**
```bash
npm run dev
```

The API server will start on [http://localhost:5000](http://localhost:5000).

---

## 🧪 Running Tests

To run the suite of automated tests and verify the business logic, execute the following command:

```bash
npm test
```

---

## 📄 API Documentation

For detailed information on all available endpoints, request bodies, and example responses, please see the complete documentation here:  

➡️ **[API Documentation](API_DOCS.md)**

---

## 📂 Project Structure

```
inventory-management-api/
├── config/             # Database connection logic
├── controllers/        # Business logic for routes
├── middlewares/        # Custom middleware (e.g., error handling)
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── tests/              # Automated tests
├── .gitignore          # Files to be ignored by Git
├── app.js              # Express app definition
├── index.js            # Main server entry point
├── package.json        # Project dependencies and scripts
├── API_DOCS.md         # Detailed API documentation
└── README.md           # This file
```
