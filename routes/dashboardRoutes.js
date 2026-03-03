import express from 'express';
import { getDashboardStats, getChartData, getRecentActivity } from '../controllers/dashboardControllers.js';

const router = express.Router();

router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/chart-data', getChartData);
router.get('/dashboard/recent-activity', getRecentActivity);

export default router;
