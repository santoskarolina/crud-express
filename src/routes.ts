import  { Router } from "express";
import { CategoryController } from "./controller/category.controller";
import { VideoController } from "./controller/videoController";
import { categoryRouter } from "./routes/catagory.router";
import { videoRoutes } from "./routes/video.router";

const routes = Router()
routes.use(categoryRouter)
routes.use(videoRoutes)

export {routes}