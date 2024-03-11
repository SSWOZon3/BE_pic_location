import express from 'express';
import { createReviewController, getReviewController, getReviewsInArea } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReviewController);
router.get('/area', getReviewsInArea);
router.get('/:_id', getReviewController);

export default router;
