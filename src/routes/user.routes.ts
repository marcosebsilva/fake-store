import express from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/', authMiddleware, userController.find);
router.put('/', authMiddleware, userController.updateCoinAmount);

export default router;