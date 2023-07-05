import express from 'express';
const router=express.Router();
import videoController from '../controllers/videoController';
router.get("/all",videoController.getVideos); 
router.post("/pause",videoController.stopFetch);
router.post("/start",videoController.startFetch);
router.get("/search",videoController.searchVideos);
router.get("/query",videoController.getQuery);
router.post("/query",videoController.setQuery);
export {router as router};