
const express = require("express");
const router = express.Router();

const {
  getLaptopSpecifications,
  getLaptopSpecificationById,
  createLaptopSpecification,
  updateLaptopSpecification,
  deleteLaptopSpecification,
} = require("../controllers/laptopSpecificationController");

router.get("/", getLaptopSpecifications);
router.get("/:id", getLaptopSpecificationById);
router.post("/", createLaptopSpecification);
router.put("/:id", updateLaptopSpecification);
router.delete("/:id", deleteLaptopSpecification);

module.exports = router;
