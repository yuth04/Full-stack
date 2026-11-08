
const express = require("express");
const router = express.Router();

const {
  getProductVariants,
  getProductVariantById,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
} = require("../controllers/productVariantController");

router.get("/", getProductVariants);
router.get("/:id", getProductVariantById);
router.post("/", createProductVariant);
router.put("/:id", updateProductVariant);
router.delete("/:id", deleteProductVariant);

module.exports = router;
