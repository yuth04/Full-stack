const { Brand, Product } = require("../../models");
const { redis } = require("../../config/redis");

const CACHE_TTL = 60;
const CACHE_KEY = "brands.all";

// Helper: Clear brand cache
const clearBrandCache = async () => {
    await redis.del(CACHE_KEY);
};

// READ: Get all brands
const getBrands = async (req, res) => {
    try {
        const cachedBrands = await redis.get(CACHE_KEY);

        if (cachedBrands) {
            return res.status(200).json({
                success: true,
                message: "Brands fetched successfully (cache).",
                data: JSON.parse(cachedBrands),
            });
        }

        const brands = await Brand.findAll({
            order: [["id", "ASC"]],
            include: [
                {
                    model: Product,
                    attributes: [
                        "id",
                        "productName",
                        "price",
                        "brand_id",
                    ],
                },
            ],
        });

        await redis.setEx(
            CACHE_KEY,
            CACHE_TTL,
            JSON.stringify(brands)
        );

        return res.status(200).json({
            success: true,
            message: "Brands fetched successfully.",
            data: brands,
        });
    } catch (error) {
        console.error("Error fetching brands:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch brands.",
        });
    }
};

// READ: Get brand by ID
const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await Brand.findByPk(id, {
            include: [
                {
                    model: Product,
                    attributes: [
                        "id",
                        "productName",
                        "price",
                        "isActive",
                    ],
                },
            ],
        });

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get brand successfully.",
            data: brand,
        });
    } catch (error) {
        console.error("Error fetching brand:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch brand.",
        });
    }
};

// CREATE: Add brand
const createBrand = async (req, res) => {
    try {
        const { name, logo, isActive } = req.body;

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Brand name is required.",
            });
        }

        const cleanName = name.trim();

        const existingBrand = await Brand.findOne({
            where: { name: cleanName },
        });

        if (existingBrand) {
            return res.status(409).json({
                success: false,
                message: "Brand already exists.",
            });
        }

        const slug = cleanName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const brand = await Brand.create({
            name: cleanName,
            slug,
            logo: logo || null,
            isActive: isActive ?? true,
        });

        await clearBrandCache();

        return res.status(201).json({
            success: true,
            message: "Brand created successfully.",
            data: brand,
        });
    } catch (error) {
        console.error("Error creating brand:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create brand.",
            error: error.message,
        });
    }
};

// UPDATE: Update brand
const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, logo, isActive } = req.body;

        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found.",
            });
        }

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Brand name cannot be empty.",
                });
            }

            const cleanName = name.trim();

            const existingBrand = await Brand.findOne({
                where: { name: cleanName },
            });

            if (existingBrand && existingBrand.id !== brand.id) {
                return res.status(409).json({
                    success: false,
                    message: "Brand name already exists.",
                });
            }

            brand.name = cleanName;

            brand.slug = cleanName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
        }

        if (logo !== undefined) {
            brand.logo = logo || null;
        }

        if (isActive !== undefined) {
            if (typeof isActive !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "isActive must be a boolean.",
                });
            }

            brand.isActive = isActive;
        }

        await brand.save();

        await clearBrandCache();

        return res.status(200).json({
            success: true,
            message: "Brand updated successfully.",
            data: brand,
        });
    } catch (error) {
        console.error("Error updating brand:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update brand.",
        });
    }
};

// DELETE: Delete brand
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand not found.",
            });
        }

        // Prevent deleting a brand that still has products
        const productCount = await Product.count({
            where: { brand_id: id },
        });

        if (productCount > 0) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete brand because it contains products.",
            });
        }

        await brand.destroy();

        await clearBrandCache();

        return res.status(200).json({
            success: true,
            message: "Brand deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting brand:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete brand.",
        });
    }
};

module.exports = {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
};