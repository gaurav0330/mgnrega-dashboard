import express from 'express';
import { getDistricts, getDistrictSummary } from '../controllers/districtController.js';

const router = express.Router();

router.get('/districts', getDistricts);
router.get('/district/:code/summary', getDistrictSummary);

export default router;
