import  { Router } from "express";
import { VideoController } from "../controller/videoController";

const videoRoutes = Router()

videoRoutes.post('/videos', new VideoController().create)
videoRoutes.get('/videos', new VideoController().listVideos)
videoRoutes.get('/videos/:id', new VideoController().getOne)
videoRoutes.delete('/videos/:id', new VideoController().deleteOne)
videoRoutes.put('/videos/:id', new VideoController().update)

export {videoRoutes}