const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
// import controller
const { getProducts, getById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
// 
router.get('/', getProducts);
router.get('/:id', getById);
router.post("/", upload.single("image"), (req, res, next) => {
    console.log("CREATE BODY:", req.body);
    console.log("CREATE FILE:", req.file);
    next();
}, createProduct);

router.put("/:id", upload.single("image"), (req, res, next) => {
    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE FILE:", req.file);
    next();
}, updateProduct);
router.delete('/:id', deleteProduct);



module.exports = router;