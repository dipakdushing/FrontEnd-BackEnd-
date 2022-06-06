
const express = require("express");

const router = express.Router();
const Product = require("../models/product.model");



// All query route------------------------------->

router.get("/", async (req, res) => {
    // setting up default page number and items per page and sorting method by accending method
    const page = req.query.page || 1;
    const item = req.query.items || 10;
    let sort = req.query.sort || "sort_acc" 


    try {

       
        let product;
        let filter = {};
        //  query for color filter
        if (req.query.color) {
            const color = req.query.color.split(",")
            filter.color = { $in: color }
        }
        // query for brand name filter
        if (req.query.name) {
            const name = req.query.name.split(",")
            filter.name = { $in: name }
        } 
        // query for colthes type filter
        if (req.query.type) {
            const type = req.query.type.split(",")
            filter.type = { $in: type }
        }

        //  setting up sorting methods
        
       if(sort=="sort_acc"){
           sort = {"discount_price" : 1}
       }else{
           sort = { "discount_price": -1 }
       }
       
    //    finding product items based on different queries
        product = await Product.find(filter).skip((page - 1) * item).sort(sort).limit(item).lean().exec();
        let pagecount = await Product.find(filter).countDocuments()
        //  finding how many product are found and diving into separte page count
        pagecount = Math.ceil(pagecount / item)
        res.status(201).send({ product, pagecount })

    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log("nhi")
    }
})
//route  for id controller------------------------------->
router.get("/:id", async (req, res) => {
    try {
        const user = await Product.findById(req.params.id).lean().exec(); //findById will Read document By MONGO-ID & .param() =mongoid
        return res.send(user);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});


module.exports = router;