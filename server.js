import express  from "express";
import mongoose from 'mongoose';
import products from "./products.js";
import Product from "./models/productModels.js";
import {getProducts,getProductById,deleteProduct,createProduct,updateProduct, getTopProducts}  from "./controllers/productControllers.js";
const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/nishsah1", {useUnifiedTopology: true,
    useNewUrlParser: true,
    }
    ).then(db => console.log('DB is connected'))
    .catch(err => console.log(err));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/",function(req,res){
    res.send("hey");
});

//This line of code i use only on time to store data from products.js to my mongodb database  

// products.forEach(async (productData) => {
//     const product = new Product(productData);
  
//     try {
//       await product.save();
//     } catch (error) {
//       console.error("Failed to save a product to the database:", error);
//     }
//   });

    
app.get("/api/products/",getProducts);
app.get("/api/products/:id",getProductById);
app.delete("/api/products/:id",deleteProduct);
app.post("/api/products/",createProduct);
app.put('/api/products/:id',updateProduct);
app.get('/api/topproducts',getTopProducts);


const PORT =process.env.PORT || 5000;

app.listen(5000,function(req,res){
    console.log(`Server is running in port 5000`);
});

