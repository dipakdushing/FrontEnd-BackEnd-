const express =  require("express");
const app = express();
app.use(express.json());
const productcontroller = require("./controllers/product.controller");
// end point for product page and entity page 
app.use("/product", productcontroller);
module.exports  = app

