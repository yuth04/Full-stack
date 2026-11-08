const { Product, Category, Brand } = require("../../models");
const { redis } = require("../../config/redis");
const CACHE_TTL = 60;
const { generateSku } = require("../services/skuService");
// Get ALl
const getProducts = async (req, res) => {
    try {
        const cacheKey = "products:all";

        console.log("Redis ready:", redis.isReady);

        // Check Redis cache
        const cachedProducts = await redis.get(cacheKey);

        if (cachedProducts) {
            // console.log("CACHE HIT:", cacheKey);

            return res.status(200).json({
                success: true,
                message: "Get products successful (cache).",
                data: JSON.parse(cachedProducts),
            });
        }

        console.log("CACHE MISS:", cacheKey);

        // Fetch from PostgreSQL
        const products = await Product.findAll({
            // order: [["id", "ASC"]],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Category,
                    attributes: ["id", "name"],

                },
                {
                    model: Brand,
                    attributes: ["id", "name"],

                },
            ],

        });
        console.log("Products found:", products.length);

        // Save to Redis
        const result = await redis.setEx(
            cacheKey,
            CACHE_TTL,
            JSON.stringify(products)
        );

        console.log("Redis SET result:", result);

        return res.status(200).json({
            success: true,
            message: "Get products successful.",
            data: products,
        });
    } catch (error) {
        console.error("getProducts error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get products.",
        });
    }
};
/// Get one product with Redis caching
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const cacheKey = `products:${id}`;

        // 1. Check Redis cache
        const cachedProduct = await redis.get(cacheKey);

        if (cachedProduct) {
            return res.status(200).json({
                success: true,
                message: "Get product successful (cache).",
                data: JSON.parse(cachedProduct),
            });
        }

        // 2. Cache miss: get product from PostgreSQL
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        // 3. Save product in Redis for 60 seconds
        await redis.setEx(
            cacheKey,
            CACHE_TTL,
            JSON.stringify(product)
        );

        return res.status(200).json({
            success: true,
            message: "Get product successful.",
            data: product,
        });
    } catch (error) {
        console.error("getById error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get product.",
        });
    }
};
// Create product and save to Redis
const createProduct = async (req, res) => {
    try {
        const {
            productName,
            description,
            qty,
            price,
            isActive,
            brand_id,
            category_id,
        } = req.body;
        const image = req.file ? req.file.filename : null;
        // 1. Validate required fields
        if (
            typeof productName !== "string" ||
            !productName.trim() ||
            price === undefined ||
            price === null ||
            price === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "productName and price are required.",
            });
        }

        // 2. Validate price
        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "price must be a non-negative number.",
            });
        }

        // 3. Validate quantity
        const numericQty = qty === undefined ? 0 : Number(qty);

        if (!Number.isInteger(numericQty) || numericQty < 0) {
            return res.status(400).json({
                success: false,
                message: "qty must be a non-negative integer.",
            });
        }
        // sku
        const sku = generateSku(category_id);
        // 4. Create product in PostgreSQL
        const product = await Product.create({
            productName: productName.trim(),
            description: description ?? null,
            qty: numericQty,
            price: numericPrice,
            isActive: isActive ?? true,
            category_id: category_id,
            brand_id: brand_id,
            image,
            sku,
        });

        // 5. Invalidate stale Redis cache
        try {
            await redis.del("products:all");

            // Cache the newly created product by ID
            await redis.setEx(
                `products:${product.id}`,
                CACHE_TTL,
                JSON.stringify(product)
            );

            console.log("Product cache updated:", product.id);
        } catch (redisError) {
            // Product was already created in PostgreSQL
            console.error("Redis cache error:", redisError.message);
        }

        // 6. Return successful response
        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: product,
        });
    } catch (error) {
        console.error("createProduct error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create product.",
        });
    }
};
// Update 
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ success: false, message: "Invalid product ID." });
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        const { productName, description, qty, price, isActive, category_id, brand_id } = req.body;
        const updates = {};

        if (productName !== undefined) {
            if (typeof productName !== "string" || !productName.trim()) {
                return res.status(400).json({ success: false, message: "productName cannot be empty." });
            }
            updates.productName = productName.trim();
        }

        if (description !== undefined) updates.description = description;

        if (price !== undefined) {
            const numericPrice = Number(price);
            if (price === "" || !Number.isFinite(numericPrice) || numericPrice < 0) {
                return res.status(400).json({ success: false, message: "price must be a non-negative number." });
            }
            updates.price = numericPrice;
        }

        if (qty !== undefined) {
            const numericQty = Number(qty);
            if (qty === "" || !Number.isInteger(numericQty) || numericQty < 0) {
                return res.status(400).json({ success: false, message: "qty must be a non-negative integer." });
            }
            updates.qty = numericQty;
        }

        // FormData sends booleans as strings
        if (isActive !== undefined) {
            updates.isActive = isActive === true || isActive === "true";
        }
        // catgory
        if (category_id !== undefined) {
            if (category_id === "" || category_id === null || category_id === "null") {
                updates.category_id = null;
            } else {
                const category = await Category.findByPk(Number(category_id));
                if (!category) {
                    return res.status(400).json({ success: false, message: "Category not found." });
                }
                updates.category_id = category.id;
            }
        }
        // brand
        if (brand_id !== undefined) {
            if (brand_id === "" || brand_id === null || brand_id === "null") {
                updates.brand_id = null;
            } else {
                const brand = await Brand.findByPk(Number(brand_id));
                if (!brand) {
                    return res.status(400).json({ success: false, message: "Brand not found." });
                }
                updates.brand_id = brand.id;
            }
        }

        // New image replaces the old one
        let oldImage = null;
        if (req.file) {
            oldImage = product.image;
            updates.image = req.file.filename;
        }

        await product.update(updates); // sku is never updated

        if (oldImage) {
            try {
                await fs.unlink(path.join(__dirname, "../uploads", oldImage)); // match your upload folder
            } catch (err) {
                console.error("Old image delete error:", err.message);
            }
        }

        try {
            await redis.del(["products:all", `products:${id}`]);
        } catch (redisError) {
            console.error("Redis cache error:", redisError.message);
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: product,
        });
    } catch (error) {
        console.error("updateProduct error:", error);
        return res.status(500).json({ success: false, message: "Failed to update product." });
    }
};
// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByPk(id);
//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found.",
//             });
//         }
//         const { productName, description, price, qty, isActive, category_id, sku } = req.body;
//         const image = req.file ? req.file.filename : undefined;
//         const updates = {};
//         // Validate input
//         if (productName !== undefined) {
//             if (typeof productName !== "string" || !productName.trim()) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "productName must be a non-empty string."
//                 });
//             }
//             updates.productName = productName.trim();
//         }

//         if (price !== undefined) {
//             const numericPrice = Number(price);

//             if (price === null || price === "" || !Number.isFinite(numericPrice) || numericPrice < 0) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "price must be a non-negative number.",
//                 });
//             }
//             updates.price = numericPrice;
//         }
//         if (qty !== undefined) {
//             const numericQty = Number(qty);

//             if (qty === null || qty === "" || !Number.isInteger(numericQty) || numericQty < 0) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "qty must be a non-negative integer.",
//                 });
//             }
//             updates.qty = numericQty;
//         }
//         if (isActive !== undefined) {
//             if (typeof isActive !== "boolean") {
//                 return res.status(400).json({
//                     success: false,
//                     message: "isActive must be a boolean.",
//                 });
//             }
//             updates.isActive = isActive;
//         }
//         if (description !== undefined) updates.description = description;
//         if (image !== undefined) updates.image = image;
//         if (category_id !== undefined) updates.category_id = Number(category_id);

//         if (Object.keys(updates).length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No valid fields provided to update.",
//             });
//         }
//         // update to db
//         await product.update(updates);

//         // refresh redis cache
//         try {
//             await redis.del("products:all");

//             await redis.setEx(`product:${product.id}`,
//                 CACHE_TTL,
//                 JSON.stringify(product)
//             );

//             console.log("Product cache updated: ", product.id);

//         } catch (redisError) {
//             console.error("Redis cache error:", redisError.message);
//         }
//         // Return updated product
//         return res.status(200).json({
//             success: true,
//             message: "Product updated successfully.",
//             data: product
//         });
//     }
//     catch (error) {
//         console.error("updateProduct error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Failed to update product.",
//         });
//     }
// }
// Delete
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID.",
            });
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        // delete from db
        await product.destroy();


        try {
            await redis.del(["products:all", `products:${id}`]);
            console.log("Product cache cleared:", id);
        } catch (redisError) {
            console.error("Redis cache error:", redisError.message);
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        if (error.name === "SequelizeForeignKeyConstraintError") {
            return res.status(409).json({
                success: false,
                message: "This product is used in other records. Deactivate it instead of deleting.",
            });
        }

        console.error("deleteProduct error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete product.",
        });
    }
};

module.exports = {
    getProducts,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
};
