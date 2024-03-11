import express from 'express';
import userRouter from './domain/routers/userRouter.js';
import reviewRouter from './domain/routers/reviewRouter.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/review', reviewRouter);

export default router;