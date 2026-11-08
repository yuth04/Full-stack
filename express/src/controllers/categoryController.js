const { Product, Category } = require("../../models");
const { redis } = require("../../config/redis");

const CACHE_TTL = 60;
const CACHE_KEY = "categories.all";

// Helper: Clear category cache
const clearCategoryCache = async () => {
    await redis.del(CACHE_KEY);
};

// READ: Get all categories
const getCategories = async (req, res) => {
    try {
        const cachedCategories = await redis.get(CACHE_KEY);

        if (cachedCategories) {
            return res.status(200).json({
                success: true,
                message: "Categories fetched successfully (cache).",
                data: JSON.parse(cachedCategories),
            });
        }

        const categories = await Category.findAll({
            order: [["id", "ASC"]],
            include: [
                {
                    model: Product,
                    attributes: [
                        "id",
                        "productName",
                        "price",
                        "category_id",
                    ],
                },
            ],
        });

        await redis.setEx(
            CACHE_KEY,
            CACHE_TTL,
            JSON.stringify(categories)
        );

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully.",
            data: categories,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories.",
        });
    }
};
// Get By id
const getById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
        include: [
            {
                model: Product,
                attributes: [
                    "id",
                    "productName",
                    "price",
                    "isActive"
                ],
            },
        ],
    });
    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found."
        })
    }
    res.status(200).json({
        success: true,
        message: "Get category successfully.",
        data: category
    });
}
// CREATE: Add category
const createCategory = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required.",
            });
        }

        console.log("Creating category:", req.body);

        // Create category
        const category = await Category.create({
            name: name.trim(),
            description: description?.trim() || null,
            isActive: isActive ?? true,
        });

        console.log("Category created:", category.id);

        // Clear Redis cache
        await clearCategoryCache();

        console.log("Category cache cleared.");

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: category,
        });

    } catch (error) {
        console.error("Error creating category:", error);
        console.error("Error message:", error.message);
        console.error("Error details:", error.parent || error.original);

        return res.status(500).json({
            success: false,
            message: "Failed to create category.",
            error: error.message,
        });
    }
};

// UPDATE: Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, isActive } = req.body;

        // Validate ID
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID.",
            });
        }

        // Find category
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // Validate name
        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Category name cannot be empty.",
                });
            }
        }

        // Validate description
        if (
            description !== undefined &&
            description !== null &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Description must be a string.",
            });
        }

        // Validate isActive
        if (isActive !== undefined && typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be a boolean.",
            });
        }

        // Update category
        await category.update({
            ...(name !== undefined && { name: name.trim() }),
            ...(description !== undefined && {
                description: description?.trim() || null,
            }),
            ...(isActive !== undefined && { isActive }),
        });

        // Clear Redis cache
        await clearCategoryCache();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            data: category,
        });

    } catch (error) {
        console.error("Error updating category:", error);
        console.error("Error details:", error.parent || error.original);

        return res.status(500).json({
            success: false,
            message: "Failed to update category.",
            error: error.message,
        });
    }
};

// DELETE: Delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // Prevent deleting a category that still has products
        const productCount = await Product.count({
            where: { category_id: id },
        });

        if (productCount > 0) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete category because it contains products.",
            });
        }

        await category.destroy();

        await clearCategoryCache();

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting category:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete category.",
        });
    }
};

module.exports = {
    getCategories,
    getById,
    createCategory,
    updateCategory,
    deleteCategory,

};