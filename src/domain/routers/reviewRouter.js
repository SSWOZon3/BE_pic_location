import express from 'express';
import { createReviewController, getReviewController, getReviewsInArea } from '../controllers/reviewController.js';
import multer from "multer";
import { authMiddleware } from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post('/', authMiddleware, upload.single('file'), createReviewController);
router.get('/area', authMiddleware, getReviewsInArea);
router.get('/:_id', authMiddleware, getReviewController);

export default router;
