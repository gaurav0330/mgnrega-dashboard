import express from 'express';
import { getDistricts, getDistrictSummary, getDistrictHistory, getDistrictComparison } from '../controllers/districtController.js';

const router = express.Router();

router.get('/districts', getDistricts);
router.get('/district/:code/summary', getDistrictSummary);
router.get('/district/:code/history', getDistrictHistory);
router.get('/district/:code/comparison', getDistrictComparison);

export default router;
