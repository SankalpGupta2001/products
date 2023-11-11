import asyncHandler  from "express-async-handler";
import Product from "../models/productModels.js";
import products from "../products.js";
const getProducts = asyncHandler(async(req,res)=>{
    

      
  
      const products    = await Product.find()
      res.json(products);
});

const getProductById = asyncHandler(async( req,res)=>{
    const product=await Product.findById(req.params.id);

    if(product){
        res.json(product);
    }
    else{
        res.status(404)
        throw new Error("Product not found");
    }
  });
  
const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(product){
      await product.remove();
      res.json({
        message:'Product removed'
      })
  
    }
    else{
      res.status(404);
      throw new Error("Product not Found");
    }
  });
  
const createProduct = asyncHandler(async(req,res) => {
    
 
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,
      } = req.body;
    
      const product = new Product({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,
      });
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });
  
  
const updateProduct = asyncHandler(async(req,res) => {
    const {
      name,price,description,image,brand,category,countInStock
    } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if(product){
      product.name = name;
      product.price = price;
      product.description=description;
      product.image=image;
      product.brand=brand;
      product.category=category;
      product.countInStock=countInStock;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
  
    }
    else{
      res.status(404);
      throw new Error("Product not found");
    }
  
  });




  
  const getTopProducts = asyncHandler(async(req,res) => {
  
    const products = await Product.find({}).sort({rating:-1}).limit(3);
  
    res.json(products);
  
  });

  
  export{
    getProducts,getProductById,deleteProduct,createProduct,updateProduct,getTopProducts
}

