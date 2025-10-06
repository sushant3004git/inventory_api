import Product from '../models/Product.js';

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, stock_quantity, low_stock_threshold } = req.body;
    if (!name || stock_quantity === undefined) {
      res.status(400);
      throw new Error("Product name and stock_quantity are required");
    }
    const product = await Product.create({ name, description, stock_quantity, low_stock_threshold });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};


export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};


export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};


export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }


    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;


    if (req.body.stock_quantity !== undefined && req.body.stock_quantity >= 0) {
      product.stock_quantity = req.body.stock_quantity;
    } else if (req.body.stock_quantity < 0) {
      res.status(400);
      throw new Error("Stock quantity cannot be negative");
    }

    product.low_stock_threshold = req.body.low_stock_threshold || product.low_stock_threshold;

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const increaseStock = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400);
      throw new Error("Invalid amount: must be a positive number");
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { stock_quantity: amount } },
      { new: true }
    );
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};


export const decreaseStock = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400);
      throw new Error("Invalid amount: must be a positive number");
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    if (product.stock_quantity < amount) {
      res.status(400);
      throw new Error("Insufficient stock");
    }
    product.stock_quantity -= amount;
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};


export const getLowStockProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      $expr: { $lt: ["$stock_quantity", "$low_stock_threshold"] }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
