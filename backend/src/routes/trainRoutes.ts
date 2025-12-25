import express from 'express';
import { searchTrains, getTrainStatus, searchStations } from '../controllers/trainController.js';

const router = express.Router();

// POST /api/trains/search - Search for trains
router.post('/search', searchTrains);

// GET /api/trains/status/:trainNumber - Get train status
router.get('/status/:trainNumber', getTrainStatus);

// GET /api/trains/stations?query=<search> - Search for stations
router.get('/stations', searchStations);

export default router;