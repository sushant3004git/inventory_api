import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import server from '../index.js'; 
import Product from '../models/Product.js';

let mongoServer;


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 30000); 

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close(); 
});

beforeEach(async () => {
  await Product.deleteMany({});
});


describe('Product Inventory API', () => {
  
  it('should create a new product successfully', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({
        name: 'Gaming Mouse',
        stock_quantity: 50,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toBe('Gaming Mouse');
  });

  it('should increase stock for a specific product', async () => {
    const product = await Product.create({ name: 'USB Hub', stock_quantity: 20 });
    const response = await request(server)
      .post(`/api/products/${product._id}/increase`)
      .send({ amount: 10 });
    expect(response.statusCode).toEqual(200);
    expect(response.body.stock_quantity).toBe(30);
  });

  it('should decrease stock for a specific product', async () => {
    const product = await Product.create({ name: 'Mechanical Keyboard', stock_quantity: 25 });
    const response = await request(server)
      .post(`/api/products/${product._id}/decrease`)
      .send({ amount: 5 });
    expect(response.statusCode).toEqual(200);
    expect(response.body.stock_quantity).toBe(20);
  });

  it('should return a 400 error when trying to decrease more stock than available', async () => {
    const product = await Product.create({ name: 'Webcam', stock_quantity: 5 });
    const response = await request(server)
      .post(`/api/products/${product._id}/decrease`)
      .send({ amount: 10 });
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('Insufficient stock');
  });
  
  it('should fetch only the products that are below their low-stock threshold', async () => {
    await Product.create({ name: 'Low Stock Monitor', stock_quantity: 4, low_stock_threshold: 5 });
    await Product.create({ name: 'High Stock Desk Mat', stock_quantity: 10, low_stock_threshold: 5 });
    const response = await request(server).get('/api/products/low-stock');
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Low Stock Monitor');
  });

  it('should return a 404 error for a product that does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(server).get(`/api/products/${nonExistentId}`);
      expect(response.statusCode).toEqual(404);
  });
});

