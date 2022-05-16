const Product = require("../models/product");

exports.createProduct = (req, res) => {
  const { productName, price, description, quantity } = req.body;

  const product = new Product({
    productName,

    price,
    quantity,
    description,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.getAllProducts = (req, res) => {
  Product.find({}).exec((err, products) => {
    if (err) return res.status(400).json({ err });
    if (products) {
      res.status(200).json({ products });
    }
  });
};

exports.updateProduct = (req, res) => {
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        productName: req.body.productName,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
      },
    }
  )
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
