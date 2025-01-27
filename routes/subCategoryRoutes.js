import express from "express";
import { createSubCategory, getSubCategories, editSubCategory } from '../controllers/subCategoryController.js';

const router = express.Router();

router.get('/find', getSubCategories);
router.post('/create', createSubCategory);
router.put('/:subCategoryId', editSubCategory);

export default router;