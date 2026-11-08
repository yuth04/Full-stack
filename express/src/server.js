const express = require('express');
const cors = require('cors');
const sequelize = require('../config/database');
const { connectRedis } = require('../config/redis');
const path = require("path");
const app = express();
const PORT = process.env.PORT;
const productRoutes = require('./routes/product.route')
const categoryRoutes = require('./routes/category.route')
const brandRoutes = require("./routes/brand.route");
const variantRoutes = require("./routes/productVariant.route");
const laptopSpecificationRoutes = require("./routes/laptopSpecification.route");

// cors origin
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/uploads",
    express.static(path.join(__dirname, "./uploads"))
);
// Health
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "API is running"
    });
});
// Product routes
app.use('/api/v1/products', productRoutes);
// Category routes
app.use('/api/v1/categories', categoryRoutes);
// Brand routes
app.use("/api/v1/brands", brandRoutes);
//  Variant routes
app.use("/api/v1/variants",variantRoutes);
// Specification routes
app.use("/api/v1/laptop-specifications", laptopSpecificationRoutes);
// 404 handler
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "API endpoint not found.",
    });
});
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        await connectRedis();
        console.log('Redis connected.');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();