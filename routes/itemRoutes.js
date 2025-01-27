import express from "express";
import { createItem, getItems, editItem, searchItem } from '../controllers/itemController.js';

const router = express.Router();

router.get('/find', getItems);
router.post('/create', createItem);
router.put('/:itemId', editItem);
router.get('/search', searchItem);

export default router;