const { Product, LaptopSpecification } = require("../../models");
const { redis } = require("../../config/redis");

const CACHE_TTL = 60;
const CACHE_KEY = "laptopSpecifications.all";

// Clear cache
const clearLaptopSpecificationCache = async () => {
  await redis.del(CACHE_KEY);
};

// GET ALL LAPTOP SPECIFICATIONS
const getLaptopSpecifications = async (req, res) => {
  try {
    const cachedSpecifications = await redis.get(CACHE_KEY);

    if (cachedSpecifications) {
      return res.status(200).json({
        success: true,
        message: "Laptop specifications fetched successfully (cache).",
        data: JSON.parse(cachedSpecifications),
      });
    }

    const specifications = await LaptopSpecification.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "productName"],
        },
      ],
    });

    await redis.setEx(
      CACHE_KEY,
      CACHE_TTL,
      JSON.stringify(specifications)
    );

    return res.status(200).json({
      success: true,
      message: "Laptop specifications fetched successfully.",
      data: specifications,
    });
  } catch (error) {
    console.error("Error fetching laptop specifications:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch laptop specifications.",
    });
  }
};

// GET LAPTOP SPECIFICATION BY ID
const getLaptopSpecificationById = async (req, res) => {
  try {
    const { id } = req.params;

    const specification = await LaptopSpecification.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "productName"],
        },
      ],
    });

    if (!specification) {
      return res.status(404).json({
        success: false,
        message: "Laptop specification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Laptop specification fetched successfully.",
      data: specification,
    });
  } catch (error) {
    console.error("Error fetching laptop specification:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch laptop specification.",
    });
  }
};

// CREATE LAPTOP SPECIFICATION
const createLaptopSpecification = async (req, res) => {
  try {
    const {
      product_id,
      processor,
      generation,
      ram,
      storage,
      gpu,
      display_size,
      resolution,
      refresh_rate,
      battery,
      operating_system,
      weight,
    } = req.body;

    // Validate product ID
    if (
      product_id !== undefined &&
      product_id !== null &&
      product_id !== ""
    ) {
      if (
        !Number.isInteger(Number(product_id)) ||
        Number(product_id) <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        });
      }

      const product = await Product.findByPk(product_id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }
    }

    const specification = await LaptopSpecification.create({
      product_id: product_id || null,
      processor,
      generation,
      ram,
      storage,
      gpu,
      display_size,
      resolution,
      refresh_rate,
      battery,
      operating_system,
      weight,
    });

    await clearLaptopSpecificationCache();

    return res.status(201).json({
      success: true,
      message: "Laptop specification created successfully.",
      data: specification,
    });
  } catch (error) {
    console.error("Error creating laptop specification:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create laptop specification.",
    });
  }
};

// UPDATE LAPTOP SPECIFICATION
const updateLaptopSpecification = async (req, res) => {
  try {
    const { id } = req.params;

    const specification = await LaptopSpecification.findByPk(id);

    if (!specification) {
      return res.status(404).json({
        success: false,
        message: "Laptop specification not found.",
      });
    }

    const {
      product_id,
      processor,
      generation,
      ram,
      storage,
      gpu,
      display_size,
      resolution,
      refresh_rate,
      battery,
      operating_system,
      weight,
    } = req.body;

    // Validate product ID
    if (product_id !== undefined) {
      if (product_id === null || product_id === "") {
        specification.product_id = null;
      } else {
        if (
          !Number.isInteger(Number(product_id)) ||
          Number(product_id) <= 0
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid product ID.",
          });
        }

        const product = await Product.findByPk(product_id);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found.",
          });
        }

        specification.product_id = product_id;
      }
    }

    // Update specification fields
    const fields = {
      processor,
      generation,
      ram,
      storage,
      gpu,
      display_size,
      resolution,
      refresh_rate,
      battery,
      operating_system,
      weight,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined) {
        specification[key] = value;
      }
    });

    await specification.save();
    await clearLaptopSpecificationCache();

    return res.status(200).json({
      success: true,
      message: "Laptop specification updated successfully.",
      data: specification,
    });
  } catch (error) {
    console.error("Error updating laptop specification:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update laptop specification.",
    });
  }
};

// DELETE LAPTOP SPECIFICATION
const deleteLaptopSpecification = async (req, res) => {
  try {
    const { id } = req.params;

    const specification = await LaptopSpecification.findByPk(id);

    if (!specification) {
      return res.status(404).json({
        success: false,
        message: "Laptop specification not found.",
      });
    }

    await specification.destroy();
    await clearLaptopSpecificationCache();

    return res.status(200).json({
      success: true,
      message: "Laptop specification deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting laptop specification:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete laptop specification.",
    });
  }
};

module.exports = {
  getLaptopSpecifications,
  getLaptopSpecificationById,
  createLaptopSpecification,
  updateLaptopSpecification,
  deleteLaptopSpecification,
};
