import express from "express";
import { createCategory, getCategories, EditCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create', createCategory);
router.get('/find', getCategories);
router.put('/:categoryId', EditCategory);

export default router;