import express from 'express';
import Shop from '../models/shopModel.js';
import { getShops, addShop, getSingleShop, updateShop, deleteShop } from '../controllers/shopControllers.js';

const router = express.Router();

router.get("/shops", getShops)
router.post("/addshop", addShop)
router.get("/shop/:id", getSingleShop)
router.put("/updateshop/:id", updateShop)
router.delete("/deleteshop/:id", deleteShop)

export default router
