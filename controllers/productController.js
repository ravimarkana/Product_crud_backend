const Product = require("../model/Product");

// Get All products
const product_all = async (req, res) => {
  try {
    const limitValue = req.query.limit;
    const skipValue = limitValue;
    const products = await Product.find({ create: 1 })
      .limit(limitValue).skip(skipValue);
    res.json(products);
  } catch (error) {
    res.json({ message: error });
  }
};

// const products = await Product.find({create:0})
// find().limit(10).toArray(function (err, docs) {
//   collection.find().skip(10).limit(10).toArray(function (err, docs) {
//   });
// });

// Single product
const product_details = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.json({ message: error });
  }
};

// Add New product
const product_create = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    create: 1,
    price: req.body.price,
    image: req.body.image,
    details: req.body.details
  });

  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Update product
const product_update = async (req, res) => {
  try {
    const product = {
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      details: req.body.details
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      product
    );
    res.json(updatedProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete product
const product_delete = async (req, res) => {
  try {
    const removeProduct = await Product.findByIdAndDelete(req.params.productId);
    res.json(removeProduct);
  } catch (error) {
    res.json({ message: error });
  }
};

// buy product
const buy_product = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobileno: req.body.mobileno,
    address: req.body.address,
    image: req.body.image,
    create: 0
  });

  try {
    const buyProduct = await product.save();
    res.send(buyProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

const get_product = async (re, res) => {
  const product = await Product.find({ create: 0 })

  // let groupBy = product.reduce((group, element) => {
  //   let {title} = element;
  //   group[title] = group[title] ?? [];
  //   group[title].push(element);
  //   return group;
  // }, {});
  // console.log('groupBy: ', groupBy);
  // res.send(groupBy);

  res.send(product);
}

module.exports = {
  product_all,
  product_details,
  product_create,
  product_update,
  product_delete,
  buy_product,
  get_product
}