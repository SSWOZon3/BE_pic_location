import express from 'express';
import { login, register, getUserInfo, getFavorites, addToFavorites, removeFromFavorites } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUserInfo);
router.get('/favorites', authMiddleware, getFavorites);
router.patch('/favorites/:reviewId', authMiddleware, addToFavorites);
router.delete('/favorites/:reviewId', authMiddleware, removeFromFavorites);

export default router;
