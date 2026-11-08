const express = require('express');
const router = express.Router();
// import controller
const { getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getById, } = require('../controllers/categoryController');
// 
router.get('/', getCategories);
router.get('/:id', getById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);



module.exports = router;