
const {
  Product,
  ProductVariant,
  ProductSerialNumber,
  InventoryBatch,
} = require("../../models");

const { redis } = require("../../config/redis");

const CACHE_TTL = 60;
const CACHE_KEY = "productVariants.all";

// Clear cache
const clearProductVariantCache = async () => {
  await redis.del(CACHE_KEY);
};

// GET ALL PRODUCT VARIANTS
const getProductVariants = async (req, res) => {
  try {
    const cachedVariants = await redis.get(CACHE_KEY);

    if (cachedVariants) {
      return res.status(200).json({
        success: true,
        message: "Product variants fetched successfully (cache).",
        data: JSON.parse(cachedVariants),
      });
    }

    const variants = await ProductVariant.findAll({
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
      JSON.stringify(variants)
    );

    return res.status(200).json({
      success: true,
      message: "Product variants fetched successfully.",
      data: variants,
    });
  } catch (error) {
    console.error("Error fetching product variants:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product variants.",
    });
  }
};

// GET PRODUCT VARIANT BY ID
const getProductVariantById = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await ProductVariant.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "productName"],
        },
        {
          model: ProductSerialNumber,
          as: "serialNumbers",
        },
        {
          model: InventoryBatch,
          as: "batches",
        },
      ],
    });

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Product variant not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product variant fetched successfully.",
      data: variant,
    });
  } catch (error) {
    console.error("Error fetching product variant:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product variant.",
    });
  }
};

// CREATE PRODUCT VARIANT
const createProductVariant = async (req, res) => {
  try {
    const {
      product_id,
      variant_name,
      sku,
      cost_price,
      selling_price,
      is_active,
    } = req.body;

    // Validate required fields
    if (
      !product_id ||
      !variant_name ||
      cost_price === undefined ||
      selling_price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Product, variant name, cost price, and selling price are required.",
      });
    }

    if (
      !Number.isInteger(Number(product_id)) ||
      Number(product_id) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    if (typeof variant_name !== "string" || !variant_name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Variant name is required.",
      });
    }

    if (
      !Number.isFinite(Number(cost_price)) ||
      Number(cost_price) < 0 ||
      !Number.isFinite(Number(selling_price)) ||
      Number(selling_price) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Prices must be valid non-negative numbers.",
      });
    }

    if (
      is_active !== undefined &&
      typeof is_active !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "is_active must be a boolean.",
      });
    }

    // Check product
    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Check duplicate SKU
    const cleanSku = sku ? sku.trim() : null;

    if (cleanSku) {
      const existingSku = await ProductVariant.findOne({
        where: { sku: cleanSku },
      });

      if (existingSku) {
        return res.status(409).json({
          success: false,
          message: "SKU already exists.",
        });
      }
    }

    const variant = await ProductVariant.create({
      product_id,
      variant_name: variant_name.trim(),
      sku: cleanSku,
      cost_price,
      selling_price,
      is_active: is_active ?? true,
    });

    await clearProductVariantCache();

    return res.status(201).json({
      success: true,
      message: "Product variant created successfully.",
      data: variant,
    });
  } catch (error) {
    console.error("Error creating product variant:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create product variant.",
    });
  }
};

// UPDATE PRODUCT VARIANT
const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await ProductVariant.findByPk(id);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Product variant not found.",
      });
    }

    const {
      product_id,
      variant_name,
      sku,
      cost_price,
      selling_price,
      is_active,
    } = req.body;

    // Validate product
    if (product_id !== undefined) {
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

      variant.product_id = product_id;
    }

    // Validate variant name
    if (variant_name !== undefined) {
      if (
        typeof variant_name !== "string" ||
        !variant_name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Variant name cannot be empty.",
        });
      }

      variant.variant_name = variant_name.trim();
    }

    // Validate SKU
    if (sku !== undefined) {
      const cleanSku = sku ? sku.trim() : null;

      if (cleanSku) {
        const existingSku = await ProductVariant.findOne({
          where: { sku: cleanSku },
        });

        if (existingSku && existingSku.id !== variant.id) {
          return res.status(409).json({
            success: false,
            message: "SKU already exists.",
          });
        }
      }

      variant.sku = cleanSku;
    }

    // Validate cost price
    if (cost_price !== undefined) {
      if (
        !Number.isFinite(Number(cost_price)) ||
        Number(cost_price) < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Cost price must be a non-negative number.",
        });
      }

      variant.cost_price = cost_price;
    }

    // Validate selling price
    if (selling_price !== undefined) {
      if (
        !Number.isFinite(Number(selling_price)) ||
        Number(selling_price) < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Selling price must be a non-negative number.",
        });
      }

      variant.selling_price = selling_price;
    }

    // Validate active status
    if (is_active !== undefined) {
      if (typeof is_active !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "is_active must be a boolean.",
        });
      }

      variant.is_active = is_active;
    }

    await variant.save();
    await clearProductVariantCache();

    return res.status(200).json({
      success: true,
      message: "Product variant updated successfully.",
      data: variant,
    });
  } catch (error) {
    console.error("Error updating product variant:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update product variant.",
    });
  }
};

// DELETE PRODUCT VARIANT
const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await ProductVariant.findByPk(id);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Product variant not found.",
      });
    }

    // Check serial numbers
    const serialCount = await ProductSerialNumber.count({
      where: { variant_id: id },
    });

    if (serialCount > 0) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete variant because it has serial numbers.",
      });
    }

    // Check inventory batches
    const batchCount = await InventoryBatch.count({
      where: { variant_id: id },
    });

    if (batchCount > 0) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete variant because it has inventory batches.",
      });
    }

    await variant.destroy();
    await clearProductVariantCache();

    return res.status(200).json({
      success: true,
      message: "Product variant deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product variant:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product variant.",
    });
  }
};

module.exports = {
  getProductVariants,
  getProductVariantById,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
};
