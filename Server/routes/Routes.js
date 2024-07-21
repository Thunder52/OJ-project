import express from 'express';
// import authRoutes from './auth.js';
import problemRoutes from './problem.js';

const router = express.Router();

// router.use('/auth', authRoutes);
router.use('/problem', problemRoutes);

export default router;