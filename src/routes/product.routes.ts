import express from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post('/',authMiddleware ,productController.addOne);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);

export default router;