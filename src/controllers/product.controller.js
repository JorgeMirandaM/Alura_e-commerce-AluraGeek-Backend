const Product = require("../models/Product");

const cloudinary = require('cloudinary').v2;

const createProduct = async (req, res) => {
  try {

    let resCloudinary = null;

    if (req.file) {
      resCloudinary = await cloudinary.uploader.upload(req.file.path);
    }

    const { categoria, nombre, precio, descripcion } = req.body;
    //Creamos la publicacion en la db
    const productDoc = await Product.create({
      categoria,
      nombre,
      precio,
      descripcion,
      imagen: resCloudinary ? resCloudinary.url : "null",
      autor: req.userId,
    });
    //Retornamos la publicacion
    return res.status(201).json({
      ok: true,
      productDoc
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: 'Hable con el admin'
    });;
  }
};

const getProducts = async (req, res) => {

  try {
    const products=await Product.find().populate("autor", ["username"]).sort({ createdAt: -1 });
    return res.status(200).json({
      ok:true,
      products
  });
  } catch (error) {
    return res.status(400).json({
      ok:false,
      msg: 'Hable con el admin'
    });;
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productDoc = await Product.findById(id).populate("autor", ["username"]);

    return res.status(200).json({
      ok:true,
      productDoc
    });
  } catch (error) {
    return res.status(400).json({
      ok:false,
      msg: 'Hable con el admin'
    });;
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const { categoria } = req.params;

    const products = await Product.find({categoria}).populate("autor", ["username"]);

    return res.status(200).json({
      ok:true,
      products
    });
  } catch (error) {
    return res.status(400).json({
      ok:false,
      msg: 'Hable con el admin'
    });;
  }
}

const updateProductById = async (req, res) => {

  try {

    const { id } = req.params;

    let resCloudinary = null;

    if (req.file) {
      resCloudinary = await cloudinary.uploader.upload(req.file.path);
    }

    const { categoria, nombre, precio, descripcion } = req.body;

    const productDoc = await Product.findById(id);

    await Product.findByIdAndUpdate(id,{
      categoria,
      nombre,
      precio,
      descripcion,
      imagen: resCloudinary ? resCloudinary.url : productDoc.imagen,
    });

    return res.status(200).json({
      ok:true
    });

  } catch (error) {
    return res.status(400).json({
      ok:false,
      msg: 'Hable con el admin'
    });;
  }
}

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.status(204).json({
      ok:true,
    });
  } catch (error) {
    return res.status(400).json({
      ok:false,
      msg:'Hable con el admin'
    });;
  }
}

module.exports = { createProduct, getProducts, getProductById,getProductsByCategory, updateProductById, deleteProductById }

